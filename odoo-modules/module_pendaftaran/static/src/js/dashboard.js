/** @odoo-module **/

import {
  Component,
  useRef,
  onMounted,
  onWillStart,
  onWillUnmount,
  useState,
} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { useService } from "@web/core/utils/hooks";

class DashboardPendaftaran extends Component {
  static template = "owl.OwlPendaftaranDashboard";

  setup() {
    this.orm = useService("orm");
    this.state = useState({
      totalRegistrants: 0,
      pendingVerification: 0,
      verifiedRegistrants: 0,
      averageAge: 0,
    });
    this.selectedPeriod = useState({ value: "Hari Ini" });
    this.trendChartRef = useRef("trendChart");
    this.distributionChartRef = useRef("distributionChart");
    this.trendChart = null;
    this.distributionChart = null;
    this.intervalId = null;

    onWillStart(async () => {
      await this.refreshData(); // Ambil data sebelum komponen dimuat
    });

    onMounted(async () => {
      await loadJS("https://cdn.jsdelivr.net/npm/chart.js");
      this.renderTrendChart({ labels: ["Tidak ada data"], data: [0] }); // Render default saat dimuat
      this.renderDistributionChart({ labels: ["Tidak ada data"], data: [0] }); // Render default saat dimuat
      this.initAnimations();
      // Refresh otomatis setiap 10 detik
      this.intervalId = setInterval(() => {
        this.refreshData();
      }, 10000);
    });

    // Bersihkan interval saat komponen dihancurkan
    onWillUnmount(() => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    });
  }

  async refreshData() {
    try {
      let startDate, endDate;
      const today = new Date();
      console.log("Current Date:", today.toISOString()); // Debug: Cek tanggal saat ini
      if (this.selectedPeriod.value === "Hari Ini") {
        startDate = today.toISOString().split("T")[0];
        endDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        )
          .toISOString()
          .split("T")[0];
      } else if (this.selectedPeriod.value === "Minggu Ini") {
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)
        );
        startDate = startOfWeek.toISOString().split("T")[0];
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        endDate = new Date(
          endOfWeek.getFullYear(),
          endOfWeek.getMonth(),
          endOfWeek.getDate() + 1
        )
          .toISOString()
          .split("T")[0];
      } else if (this.selectedPeriod.value === "Bulan Ini") {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 1)
          .toISOString()
          .split("T")[0];
      } else if (this.selectedPeriod.value === "Tahun Ini") {
        startDate = new Date(today.getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        endDate = new Date(today.getFullYear() + 1, 0, 1)
          .toISOString()
          .split("T")[0];
      }

      const domain = [
        ["tanggal_daftar", ">=", startDate],
        ["tanggal_daftar", "<", endDate],
      ];
      console.log("Domain:", domain); // Debug: Cek domain yang digunakan

      const records = await this.orm.search_read("daftar.guru", domain, [
        "name",
        "tanggal_daftar",
        "status_verifikasi",
        "umur",
        "jenis_kelamin",
      ]);
      console.log("Records:", records); // Debug: Cek data yang diambil

      let total = 0,
        pending = 0,
        verified = 0,
        ages = [],
        dateCounts = {},
        ageDistribution = {};

      total = records.length;
      pending = records.filter((r) => r.status_verifikasi === "pending").length;
      verified = records.filter(
        (r) => r.status_verifikasi === "verified"
      ).length;
      ages = records.filter((r) => r.umur).map((r) => r.umur);

      records.forEach((r) => {
        const dateStr = r.tanggal_daftar
          ? new Date(r.tanggal_daftar).toISOString().split("T")[0]
          : null;
        if (dateStr) dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;

        if (r.umur) {
          if (r.umur >= 18 && r.umur <= 25)
            ageDistribution["18-25"] = (ageDistribution["18-25"] || 0) + 1;
          else if (r.umur >= 26 && r.umur <= 30)
            ageDistribution["26-30"] = (ageDistribution["26-30"] || 0) + 1;
          else if (r.umur >= 31 && r.umur <= 40)
            ageDistribution["31-40"] = (ageDistribution["31-40"] || 0) + 1;
          else if (r.umur > 40)
            ageDistribution["40+"] = (ageDistribution["40+"] || 0) + 1;
        }
      });

      this.state.averageAge = ages.length
        ? (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1)
        : 0;
      this.state.totalRegistrants = total;
      this.state.pendingVerification = pending;
      this.state.verifiedRegistrants = verified;

      const trendData = {
        labels: Object.keys(dateCounts).sort(),
        data: Object.values(dateCounts),
      };
      const distributionData = {
        labels: Object.keys(ageDistribution),
        data: Object.values(ageDistribution),
      };

      console.log("Trend Data:", trendData); // Debug: Cek data untuk grafik trend
      console.log("Distribution Data:", distributionData); // Debug: Cek data untuk grafik distribusi

      // Render grafik dengan data atau default
      this.renderTrendChart(
        trendData.labels.length > 0 && trendData.data.length > 0
          ? trendData
          : { labels: ["Tidak ada data"], data: [0] }
      );
      this.renderDistributionChart(
        distributionData.labels.length > 0 && distributionData.data.length > 0
          ? distributionData
          : { labels: ["Tidak ada data"], data: [0] }
      );
    } catch (error) {
      console.error("Error saat menyegarkan data:", error);
    }
  }

  renderTrendChart(data) {
    if (this.trendChart) this.trendChart.destroy();
    this.trendChart = new Chart(this.trendChartRef.el, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Pendaftar Harian",
            data: data.data,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
          },
        },
      },
    });
  }

  renderDistributionChart(data) {
    if (this.distributionChart) this.distributionChart.destroy();
    this.distributionChart = new Chart(this.distributionChartRef.el, {
      type: "polarArea",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }

  initAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-active");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
  }

  onPeriodFilterChange(ev) {
    this.selectedPeriod.value = ev.target.value;
    this.refreshData();
  }

  onRefresh() {
    this.refreshData();
  }
}

DashboardPendaftaran.template = "owl.OwlPendaftaranDashboard";
registry
  .category("actions")
  .add("owl.pendaftaran_dashboard", DashboardPendaftaran);
