<template>
    <div class="card border-0 rounded-4 p-4 shadow-sm mb-4">
        <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 border-bottom pb-3 mb-4">
            <div>
                <h3 class="m-0 fs-6 font-bold text-success text-uppercase tracking-wider" style="font-weight: 700;">
                    <i class="fa-solid fa-users me-2"></i> Mandatory Briefing & Interactive Guides
                </h3>
                <p class="m-0 text-secondary mt-1" style="font-size: 12px;">Review the briefing checklists,
                    enrollment videos, and medical screening requirements below.</p>
            </div>
            <span
                class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-bold">
                <i class="fa-solid fa-play me-1"></i> Active Briefing Stage
            </span>
        </div>

        <div class="row g-4 align-items-stretch">
            <!-- Left: Interactive Video Player -->
            <div class="col-12 col-lg-7 space-y-3">
                <div class="mock-video-container shadow-lg">
                    <iframe class="mock-video-container" :src="link" frameborder="0"></iframe>
                </div>
                <h4 class="fs-6 font-bold text-dark mt-3 d-flex align-items-center gap-2" style="font-weight: 700;">
                    <i class="fa-solid fa-film text-success"></i> Enrollment & Medical Clearance Procedure Guide
                </h4>
                <p class="text-secondary m-0" style="font-size: 12px; line-height: 1.6;">
                    Watch the tutorial presentation above. It covers the 1-day step-by-step physical profiling,
                    eye examination standards (including color blindness thresholds), dental compliance
                    indicators, and document submittal pipelines.
                </p>
            </div>

            <!-- Right Checklist guidelines panel -->
            <div class="col-12 col-lg-5">
                <div class="p-4 bg-light rounded-4 border h-100 d-flex flex-column justify-content-between">
                    <div class="space-y-3">
                        <span class="text-secondary uppercase font-bold tracking-wider block mb-3"
                            style="font-size: 10px; font-weight: 700;">Briefing Overview Agenda</span>

                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex items-start gap-2.5">
                                <i class="fa-solid fa-circle-check text-success mt-1 text-sm"></i>
                                <div>
                                    <h5 class="fs-6 font-bold text-dark mb-1"
                                        style="font-size: 13px; font-weight: 700;">Academy Discipline Policies
                                    </h5>
                                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.4;">
                                        Compliance with maritime leadership uniforms, grooming rules, and
                                        behavior guidelines.</p>
                                </div>
                            </div>

                            <div class="d-flex items-start gap-2.5">
                                <i class="fa-solid fa-circle-check text-success mt-1 text-sm"></i>
                                <div>
                                    <h5 class="fs-6 font-bold text-dark mb-1"
                                        style="font-size: 13px; font-weight: 700;">Enrollment Procedures & Fees
                                    </h5>
                                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.4;">
                                        Details on submission of certified dry-sealed cards and immediate Down
                                        Payment expectations.</p>
                                </div>
                            </div>

                            <div class="d-flex items-start gap-2.5">
                                <i class="fa-solid fa-circle-check text-success mt-1 text-sm"></i>
                                <div>
                                    <h5 class="fs-6 font-bold text-dark mb-1"
                                        style="font-size: 13px; font-weight: 700;">Accredited Medical Clinic
                                        Scheduling</h5>
                                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.4;">
                                        Learn which accredited local clinics in Baliwag are certified by DOH &
                                        MARINA for the official profiling.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border-top pt-3 mt-4">
                        <button @click="$emit('medical')"
                            class="btn btn-success py-2.5 w-100 font-bold text-uppercase d-flex align-items-center justify-content-center gap-2">
                            <span>Proceed to Medical Procedure</span> <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:root {
    --bma-dark-green: #052e16;
    --bma-emerald: #0b3c24;
    --bma-light-green: #0c4a2b;
    --bma-accent: #10b981;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f3f4f6;
    min-height: 100%;
}

/* Sidebar Custom Styles */
.sidebar {
    background-color: var(--bma-dark-green);
    color: #ffffff;
    width: 288px;
    min-height: 100vh;
    flex-shrink: 0;
    z-index: 1030;
    transition: all 0.3s ease;
}

.sidebar-brand {
    background-color: #032210;
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.sidebar .nav-link {
    color: rgba(209, 250, 229, 0.7);
    font-weight: 500;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    margin-bottom: 0.25rem;
    transition: all 0.2s;
}

.sidebar .nav-link:hover {
    background-color: var(--bma-emerald);
    color: #ffffff;
}

.sidebar .nav-link.active {
    background-color: var(--bma-light-green);
    color: #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

/* Status Tracker Custom Stepper Components */
.stepper-container {
    position: relative;
}

.progress-line-bg {
    position: absolute;
    top: 24px;
    left: 5%;
    right: 5%;
    height: 4px;
    background-color: #e2e8f0;
    z-index: 1;
}

.progress-line-fill {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #3b82f6);
    width: 50%;
    transition: width 0.7s ease;
    border-radius: 2px;
}

.step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    z-index: 2;
    transition: all 0.3s ease;
    border: 4px solid #ffffff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.step-wrapper {
    position: relative;
    z-index: 2;
    cursor: pointer;
}

.step-wrapper:hover .step-circle {
    transform: scale(1.05);
}

/* Dynamic Panel Layout */
.panel-card {
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Video Simulation Styles */
.mock-video-container {
    position: relative;
    aspect-ratio: 16 / 9;
    background-color: #020617;
    border-radius: 0.75rem;
    overflow: hidden;
}

.video-backdrop {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=640&auto=format&fit=crop');
}

/* Custom alert borders */
.bg-alert-dress {
    background-color: #fffbeb;
    border-left: 4px solid #f59e0b;
}

/* Mobile Sidebar Offcanvas adjustment */
@media (max-width: 767.98s) {
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -288px;
    }

    .sidebar.show {
        left: 0;
    }
}
</style>
<script>
export default {
    name: 'PreBriefingCard',
    data() {
        return {
            link: 'http://bma.edu.ph/assets/video/COLLEGE_REGISTRAR.mp4'
        }
    },
    props: {
        examinationData: {
            type: Object,
            required: true
        }
    }
}
</script>