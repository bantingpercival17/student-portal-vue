<template>
    <div class="card border-0 rounded-4 p-4 shadow-sm mb-4">
        <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 border-bottom pb-3 mb-4">
            <div>
                <h3 class="m-0 fs-5 font-bold text-primary text-uppercase tracking-wider" style="font-weight: 800;">
                    <i class="fa-solid fa-circle-check me-2"></i> Enrollment Overview
                </h3>
                <p class="m-0 text-secondary mt-1" style="font-size: 12px;">School Year <strong>2026-2027 First
                        Semester</strong> Enrollment Roadmap Tracker</p>
            </div>
            <span
                class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill font-bold">
                <i class="fa-solid fa-graduation-cap me-1"></i> Official Matriculation Phase
            </span>
        </div>

        <div class="row g-4">
            <!-- Left Timeline: Interactive vertical progress roadmap styled perfectly like BMA's top Status Tracker -->
            <div class="col-12 col-lg-7">
                <div class="p-4 bg-white rounded-4 border">
                    <h4 class="fs-6 font-bold text-dark uppercase tracking-wider mb-4 border-bottom pb-2">
                        <i class="fa-solid fa-arrow-down-short-wide text-primary me-1"></i> Milestones Checklist
                    </h4>

                    <div class="position-relative">
                        <!-- Dynamic progress bar line container matching primary colors -->
                        <div class="timeline-vertical-fill-line" id="timelineVerticalFillLine"></div>

                        <ul class="timeline-vertical">
                            <!-- Step 1: Active Enrollment Registration -->
                            <li id="enrollStep-1" class="timeline-item-vert active">
                                <div class="timeline-badge-vert">1</div>
                                <div>
                                    <h5 class="fs-6 font-extrabold text-primary mb-1 uppercase">STEP 1 : ENROLLMENT
                                        REGISTRATION</h5>
                                    <p class="text-secondary m-0" style="font-size: 12px;">Start of Enrollment for
                                        School Year <strong>2026-2027 First Semester</strong>.</p>

                                    <!-- Interactive button badge exactly matching image -->
                                    <button onclick="submitEnrollmentRegistration()" id="btnStudentRegistration"
                                        class="btn btn-outline-success btn-sm font-semibold rounded-pill px-3 py-1.5 mt-2 transition-all d-flex align-items-center gap-1.5"
                                        style="font-size: 11px;">
                                        <i class="fa-solid fa-user-plus"></i> Student Registration
                                    </button>
                                    <span id="studentRegistrationCheckedBadge"
                                        class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1.5 mt-2 d-none"
                                        style="font-size: 11px;"><i class="fa-solid fa-check me-1"></i> Registration
                                        Completed</span>
                                </div>
                            </li>

                            <!-- Step 2: Assessment -->
                            <li id="enrollStep-2" class="timeline-item-vert">
                                <div class="timeline-badge-vert">2</div>
                                <div>
                                    <h5 class="fs-6 font-bold text-secondary mb-1 uppercase" style="font-weight: 700;"
                                        id="enrollStepTitle-2">STEP 2 : ENROLLMENT ASSESSMENT</h5>
                                    <p class="text-secondary m-0" style="font-size: 12px;">Officer assessment of high
                                        school marks, dry-sealed credits, and physical fitness certificates.</p>
                                    <div id="enrollStepBlock-2" class="mt-2 d-none">
                                        <span
                                            class="badge bg-warning-subtle text-warning border border-warning-subtle px-2 py-1"
                                            style="font-size: 10px;"><i class="fa-solid fa-spinner animate-spin"></i>
                                            Processing Academics Review...</span>
                                    </div>
                                </div>
                            </li>

                            <!-- Step 3: Tuition assessment -->
                            <li id="enrollStep-3" class="timeline-item-vert">
                                <div class="timeline-badge-vert">3</div>
                                <div>
                                    <h5 class="fs-6 font-bold text-secondary mb-1 uppercase" style="font-weight: 700;"
                                        id="enrollStepTitle-3">STEP 3 : TUITION FEE ASSESSMENT</h5>
                                    <p class="text-secondary m-0" style="font-size: 12px;">Calculation of miscellaneous
                                        dues, uniform packages, books, and laboratory resource fees.</p>
                                </div>
                            </li>

                            <!-- Step 4: Payment Transaction -->
                            <li id="enrollStep-4" class="timeline-item-vert">
                                <div class="timeline-badge-vert">4</div>
                                <div>
                                    <h5 class="fs-6 font-bold text-secondary mb-1 uppercase" style="font-weight: 700;"
                                        id="enrollStepTitle-4">STEP 4 : PAYMENT TRANSACTION</h5>
                                    <p class="text-secondary m-0" style="font-size: 12px;">Settle tuition down payments
                                        online or over-the-counter to lock assigned cadet sections.</p>
                                </div>
                            </li>

                            <!-- Step 5: Completed -->
                            <li id="enrollStep-5" class="timeline-item-vert">
                                <div class="timeline-badge-vert">5</div>
                                <div>
                                    <h5 class="fs-6 font-bold text-secondary mb-1 uppercase" style="font-weight: 700;"
                                        id="enrollStepTitle-5">STEP 5 : ENROLLMENT SUCCESSFULLY COMPLETED</h5>
                                    <p class="text-secondary m-0" style="font-size: 12px;">Matriculated successfully.
                                        View assigned class schedule and section rosters.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Right Column: Context details, tuition breakdowns, and final matriculation actions -->
            <div class="col-12 col-lg-5">
                <div class="p-4 bg-light rounded-4 border h-100 d-flex flex-column justify-content-between">
                    <div class="space-y-4">
                        <span class="text-secondary uppercase font-bold tracking-wider block mb-2"
                            style="font-size: 10px; font-weight: 700;">Assigned Cadet Information</span>

                        <div class="p-3 bg-white rounded-3 border">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center font-bold"
                                    style="width: 48px; height: 48px; font-size: 1.25rem;">
                                    K
                                </div>
                                <div>
                                    <h4 class="fs-6 font-bold text-dark m-0" style="font-weight: 700;">Ken J. Alcantara
                                    </h4>
                                    <span class="badge bg-primary mt-1 text-uppercase" style="font-size: 8px;">Program:
                                        BSMT</span>
                                </div>
                            </div>
                            <hr class="my-2.5">
                            <div class="row g-2 text-dark font-semibold" style="font-size: 11px;">
                                <div class="col-6 text-secondary">School Year:</div>
                                <div class="col-6 text-end">2026-2027</div>
                                <div class="col-6 text-secondary">Semester:</div>
                                <div class="col-6 text-end">First Semester</div>
                                <div class="col-6 text-secondary">Year Level:</div>
                                <div class="col-6 text-end">4th Class Cadet (Freshman)</div>
                            </div>
                        </div>

                        <div class="p-3 bg-white rounded-3 border mt-3">
                            <span class="text-secondary uppercase font-bold tracking-wider d-block mb-2"
                                style="font-size: 9px;">Matriculation Guidelines</span>
                            <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.5;">
                                Ensure all basic document requirements (PSA Birth Certificate, Form 138 dry-sealed, and
                                Medical Clearances) are validated. Proceed to Step 1 on the checklist to secure your
                                student record slot.
                            </p>
                        </div>
                    </div>

                    <div class="border-top pt-3 mt-4">
                        <button onclick="window.print()"
                            class="btn btn-outline-secondary w-100 font-bold d-flex align-items-center justify-content-center gap-2"
                            style="font-size: 12px; font-weight: 700;">
                            <i class="fa-solid fa-print"></i> Print Enrollment Checklist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'EnrollmentView',
    data() {
        return {

        }
    },
    components: {

    },
    computed: {

    },
    methods: {

    }
}
</script>