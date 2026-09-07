<template>
    <div class="card border-0 rounded-4 p-4 shadow-sm mb-4">
        <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 border-bottom pb-3 mb-4">
            <div>
                <h3 class="m-0 fs-6 font-bold text-success text-uppercase tracking-wider" style="font-weight: 700;">
                    <i class="fa-solid fa-heart-pulse me-2"></i> Accredited Clinic Scheduler & Clearance Results
                </h3>
                <p class="m-0 text-secondary mt-1" style="font-size: 12px;">Your assigned MARINA-certified medical
                    examination details and fitness clearances.</p>
            </div>
        </div>

        <div class="row g-4 align-items-stretch">

            <!-- Left: Location and schedule mapping -->
            <div class="col-12 col-lg-6">
                <div class="p-4 bg-light rounded-4 border h-100 d-flex flex-column justify-content-between">
                    <div>
                        <span class="text-secondary uppercase font-bold tracking-wider block mb-3"
                            style="font-size: 10px; font-weight: 700;">Accredited Clinic Assignment</span>
                        <div class="d-flex align-items-center gap-3">
                            <div class="rounded-3 bg-success bg-opacity-10 text-success border border-success border-opacity-20 d-flex align-items-center justify-content-center text-xl shrink-0"
                                style="width: 48px; height: 48px;">
                                <i class="fa-solid fa-hospital"></i>
                            </div>
                            <div>
                                <h4 class="fs-6 font-bold text-dark m-0" style="font-weight: 700;">BMA Accredited
                                    Diagnostic & Marine Clinic</h4>
                                <p class="text-secondary m-0" style="font-size: 11px;">Official Partner Medical Center
                                    (DOH Certified)</p>
                            </div>
                        </div>

                        <div class="mt-4 d-flex flex-column gap-3.5">
                            <div class="d-flex align-items-start gap-2.5">
                                <i class="fa-solid fa-location-dot text-danger mt-1"
                                    style="width: 16px; text-align: center;"></i>
                                <div>
                                    <span class="font-bold text-dark d-block"
                                        style="font-size: 12px; font-weight: 700;">Clinic Address</span>
                                    <span class="text-secondary" style="font-size: 11px;">
                                        Centerport Medical Services., Inc., 4/F, Victoria Building, 429 United Nations
                                        Ave, Ermita, Manila City, 1000 Metro Manila
                                    </span>
                                </div>
                            </div>
                            <div class="d-flex align-items-start gap-2.5">
                                <i class="fa-solid fa-clock text-primary mt-1"
                                    style="width: 16px; text-align: center;"></i>
                                <div>
                                    <span class="font-bold text-dark d-block"
                                        style="font-size: 12px; font-weight: 700;">Assigned Appointment Time</span>
                                    <span class="text-secondary" style="font-size: 11px;">
                                        {{ formatDate(medical.appointment.appointment_date) }} at 09:00 AM
                                        (Sharp)</span>
                                </div>
                            </div>
                            <div class="d-flex align-items-start gap-2.5">
                                <i class="fa-solid fa-list-check text-success mt-1"
                                    style="width: 16px; text-align: center;"></i>
                                <div>
                                    <span class="font-bold text-dark d-block"
                                        style="font-size: 12px; font-weight: 700;">Pre-testing Instructions</span>
                                    <span class="text-secondary" style="font-size: 11px;">Fasting required for at least
                                        8 hours prior. Bring your printed examination permit and 2 copies of your 2x2 ID
                                        picture.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="border-top pt-3 mt-4">
                        <a href="https://www.google.com/maps/place/Centerport+Medical+Services.,+Inc./@14.5795123,120.9787144,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ca2f83bf0ae3:0x205ff1c834bda92!8m2!3d14.5795123!4d120.9787144!16s%2Fg%2F1hc6bvc7g?hl=en&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            class="btn btn-outline-secondary w-100 font-bold d-flex align-items-center justify-content-center gap-2"
                            style="font-size: 12px; font-weight: 700;">
                            <i class="fa-solid fa-map-location-dot text-success"></i> Open Location in Google Maps
                        </a>
                    </div>
                </div>
            </div>

            <!-- Right: Medical results and Fit status -->
            <div class="col-12 col-lg-6">
                <div class="p-4 bg-white rounded-4 border h-100 d-flex flex-column justify-content-between">
                    <div>
                        <span class="text-secondary uppercase font-bold tracking-wider block mb-3"
                            style="font-size: 10px; font-weight: 700;">Assessment & Medical Clearance Results</span>

                        <!-- Result Empty State (Unlocked but awaiting simulation) -->
                        <template v-if="medical.medical_result">
                            <div v-if="medical.medical_result.is_pending" id="medicalResultEmptyState"
                                class="text-center py-5 px-3 bg-light rounded-4 border border-dashed">
                                <i class="fa-solid fa-heart-pulse text-secondary fs-1 mb-3 opacity-50"></i>
                                <h5 class="fs-6 font-bold text-secondary">Medical Evaluation Pending</h5>
                                <p class="text-secondary m-0 mt-2 mx-auto"
                                    style="font-size: 11px; max-width: 320px; line-height: 1.5;">
                                    Once you complete your physical examination at the partner clinic, your verified
                                    medical
                                    record and "Fit for Sea Duty" rating will appear here.
                                </p>
                            </div>

                            <!-- Result Success State (Simulated Passed) -->
                            <div v-if="medical.medical_result.is_fit" id="medicalResultSuccessState" class="space-y-4">
                                <div
                                    class="p-3 bg-success bg-opacity-10 border border-success border-opacity-25 rounded-3 d-flex align-items-start gap-3">
                                    <i class="fa-solid fa-shield-heart text-success fs-3 mt-1"></i>
                                    <div>
                                        <span class="badge bg-success text-white uppercase font-bold tracking-wider"
                                            style="font-size: 9px;">FIT TO ENROLL</span>
                                        <h4 class="fs-6 font-bold text-dark mt-1" style="font-weight: 800;">
                                            Congratulations, You Passed the Medical Examination!
                                        </h4>
                                        <p class="text-secondary m-0 mt-1" style="font-size: 11px; line-height: 1.5;">
                                            Congratulation's for successfully passing the physical and psychological
                                            Examination. You are now qualified to Enroll at Baliwag Maritime Academy,
                                            Inc. Please proceed to the next step for enrollment and document submission.
                                        </p>
                                        <a @click="$emit('enrollment')"
                                            class="btn btn-success btn-sm mt-3 font-bold text-uppercase d-flex align-items-center justify-content-center gap-2">
                                            <i class="fa-solid fa-file-signature"></i> Proceed to Enrollment
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div id="medicalResultEmptyState"
                                class="text-center py-5 px-3 bg-light rounded-4 border border-dashed">
                                <i class="fa-solid fa-heart-pulse text-secondary fs-1 mb-3 opacity-50"></i>
                                <h5 class="fs-6 font-bold text-secondary">Waiting for Medical Evaluation</h5>
                                <p class="text-secondary m-0 mt-2 mx-auto"
                                    style="font-size: 11px; max-width: 320px; line-height: 1.5;">
                                    Once you complete your physical examination at the partner clinic, your verified
                                    medical
                                    record and "Fit for Sea Duty" rating will appear here.
                                </p>
                            </div>
                        </template>

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
    name: 'MedicalExaminationCard',
    emits: ['enrollment'],
    props: {
        medical: Object
    },
    methods: {
        formatDate(date) {
            console.log(date)
            date = new Date(date)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            const formatter = new Intl.DateTimeFormat('en-US', options)
            return formatter.format(date)
        }
    }
}
</script>