<template>

    <div v-if="!true" class="mt-3 row">
        <!-- Left Column: Schedule and Fee -->
        <div class="col-12 col-lg-5">
            <div class="card border-0 rounded-4 p-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                        <h3 class="m-0 fs-6 font-bold text-success text-uppercase tracking-wider"
                            style="font-weight: 800; font-size: 11px;">
                            <i class="fa-regular fa-calendar-check me-2 text-sm"></i> Examination Schedule
                        </h3>
                    </div>

                    <div class="d-flex flex-column gap-4">
                        <div class="d-flex align-items-start gap-3">
                            <div class="rounded-3 bg-light d-flex align-items-center justify-content-center shadow-sm shrink-0"
                                style="width: 36px; height: 36px;">
                                <i class="fa-solid fa-calendar text-secondary"></i>
                            </div>
                            <div>
                                <span class="text-secondary uppercase font-bold d-block"
                                    style="font-size: 9px; tracking-wider: 1px;">Schedule Date</span>
                                <span class="fs-6 font-bold text-dark" style="font-weight: 800;">{{
                                    convertDate(examinationData?.examination_scheduled?.schedule_date) }}</span>
                            </div>
                        </div>

                        <div class="d-flex align-items-start gap-3">
                            <div class="rounded-3 bg-light d-flex align-items-center justify-content-center shadow-sm shrink-0"
                                style="width: 36px; height: 36px;">
                                <i class="fa-solid fa-clock text-secondary"></i>
                            </div>
                            <div>
                                <span class="text-secondary uppercase font-bold d-block"
                                    style="font-size: 9px; tracking-wider: 1px;">Reporting Time</span>
                                <span class="fs-6 font-bold text-dark" style="font-weight: 800;">08:00 AM</span>
                            </div>
                        </div>

                        <div class="d-flex align-items-start gap-3">
                            <div class="rounded-3 bg-success-subtle d-flex align-items-center justify-content-center shadow-sm shrink-0"
                                style="width: 36px; height: 36px; border: 1px solid rgba(16,185,129,0.2);">
                                <i class="fa-solid fa-receipt text-success"></i>
                            </div>
                            <div>
                                <span class="text-secondary uppercase font-bold d-block"
                                    style="font-size: 9px; tracking-wider: 1px;">Entrance Examination Fee</span>
                                <span class="fs-5 font-black text-success" style="font-weight: 900;">Php 300.00</span>
                                <p class="text-secondary mt-1 mb-0" style="font-size: 10px; line-height: 1.4;">
                                    <i class="fa-solid fa-circle-info text-success me-1"></i> Please bring this exact
                                    cash amount to cover the testing fee on your date.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Column: Compliance Guidelines and Attire Policies -->
        <div class="col-12 col-lg-7">
            <div class="card border-0 rounded-4 p-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                        <h3 class="m-0 fs-6 font-bold text-danger text-uppercase tracking-wider"
                            style="font-weight: 800; font-size: 11px;">
                            <i class="fa-solid fa-shield-halved me-2 text-sm"></i> Important Admission Guidelines
                        </h3>
                        <span
                            class="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill font-bold"
                            style="font-size: 10px; padding: 5px 10px;">
                            Strictly Monitored
                        </span>
                    </div>

                    <div class="d-flex flex-column gap-3">

                        <!-- Parent Companion requirement card -->
                        <div class="p-3 bg-light border rounded-3 d-flex align-items-start gap-3">
                            <div class="rounded-3 d-flex align-items-center justify-content-center shrink-0"
                                style="width: 36px; height: 36px; background-color: rgba(5,46,22,0.06); color: var(--bma-dark-green);">
                                <i class="fa-solid fa-people-arrows fs-5"></i>
                            </div>
                            <div>
                                <h5 class="fs-6 font-bold text-dark mb-1" style="font-weight: 700;">Parent / Guardian
                                    Presence Required</h5>
                                <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.5;">
                                    Applicants <strong>must</strong> be accompanied by parent(s) or guardian(s) on the
                                    test date. This ensures awareness, allows for clarifications, and details enrollment
                                    expectations.
                                </p>
                            </div>
                        </div>

                        <!-- Dress Code guidelines -->
                        <div class="p-3 bg-alert-dress rounded-3 d-flex align-items-start gap-3">
                            <div class="rounded-3 bg-warning bg-opacity-10 text-warning-emphasis d-flex align-items-center justify-content-center shrink-0"
                                style="width: 36px; height: 36px;">
                                <i class="fa-solid fa-user-tie fs-5"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                                    <h5 class="fs-6 font-bold text-dark m-0" style="font-weight: 700;">Decent Attire
                                        Requirement</h5>
                                    <span class="badge bg-danger text-white uppercase font-bold"
                                        style="font-size: 8px; letter-spacing: 0.5px;">Strictly Prohibited</span>
                                </div>
                                <p class="text-secondary mt-1" style="font-size: 11px; line-height: 1.5;">
                                    Applicants and accompanying guardians must wear proper, decent attire.
                                </p>
                                <div class="d-flex flex-wrap gap-2 mt-3">
                                    <span
                                        class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1.5 font-bold uppercase"
                                        style="font-size: 10px;">
                                        <i class="fa-solid fa-ban me-1"></i> Shorts
                                    </span>
                                    <span
                                        class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1.5 font-bold uppercase"
                                        style="font-size: 10px;">
                                        <i class="fa-solid fa-ban me-1"></i> Sando Shirts
                                    </span>
                                    <span
                                        class="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1.5 font-bold uppercase"
                                        style="font-size: 10px;">
                                        <i class="fa-solid fa-ban me-1"></i> Slippers
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <template v-else>
        <div class="card bg-light border rounded-3 p-3 mt-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h3 class="m-0 fs-6 font-bold text-success text-uppercase tracking-wider"
                    style="font-weight: 800; font-size: 11px;">
                    <i class="fa-regular fa-calendar-check me-2 text-sm"></i>Entrance Examination
                </h3>
            </div>

            <div v-if="examinationData.examination_scheduled.is_open">
                <template v-if="!examinationData.examination_result_v2">
                    <div class="card">
                        <div class="card-body">
                            <p> <span class="fw-bolder">INSTRUCTION</span></p>
                            <p class="m-0">
                                1. Ensure that you have a strong internet connection.
                            </p>
                            <p class="m-0">
                                2. Once you are logged in, read carefully and understand the guidelines before and after
                                Examination
                            </p>
                            <p class="m-0">
                                3. Upon completion of the Examination, click the Submit or Back button at the system.
                            </p>
                            <p class="m-0">
                                4. When you enter the examination code, your examination will begin.
                            </p>
                            <p>
                                5.We recommend using Laptop/Desktop running at least Windows 7 or higher to take the
                                examination.
                                We also recommend to use Google Chrome as browser in taking the examination.
                            </p>
                            <br>
                        </div>
                    </div>
                    <form @submit.prevent="submitExaminationCode" method="post">
                        <div class="mt-3">
                            <label for="examCodeInput" class="form-label text-muted fw-bolder mb-1">Examination Access
                                Code:</label>
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control text-uppercase font-monospace"
                                    v-model="examinationCode" placeholder="">
                                <button type="submit" class="btn btn-success font-bold text-uppercase">
                                    Proceed to Examination
                                </button>
                            </div>
                        </div>
                    </form>
                </template>
                <template v-else>
                    <div class="card">
                        <div class="card-body">
                            <p class="m-0">
                                Your examination result is <b>{{ examinationData.examination_result_v2.score }}</b>.
                            </p>
                            <p v-if="examinationData.examination_result_v2.result == 1">
                                Congratulations! You have successfully passed the entrance examination. Please proceed
                                to
                                the next step of the admission process.
                            </p>
                            <p v-else-if="examinationData.examination_result_v2.result == 0">
                                We regret to inform you that you did not pass the entrance examination. You may review
                                your results and consider reapplying in the future.
                            </p>
                        </div>
                    </div>
                </template>
            </div>
            <div v-else>
                <p> Your entrance examination is scheduled on <b>{{
                    convertDate(examinationData?.examination_scheduled?.schedule_date) }}</b>
                </p>

                <p>
                    Please ensure to that you take the examination on the specified date and
                    time,
                    otherwise, your examination slot will be forfeited.
                </p>
            </div>

        </div>
    </template>
    <section class="card border-0 rounded-4 p-4 shadow-sm mt-4">
        <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 border-bottom pb-3 mb-4">
            <div>
                <h4 class="m-0 fs-6 font-bold text-dark" style="font-weight: 700;">Step-by-Step Pathway</h4>
                <p class="m-0 text-secondary mt-1" style="font-size: 12px;">What happens on your Entrance
                    Examination day ({{ convertDate(examinationData?.examination_scheduled?.schedule_date) }})?</p>
            </div>
            <span
                class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1.5 rounded-pill font-bold">
                1-Day Process Completeness
            </span>
        </div>

        <div class="row g-4">

            <!-- Card Step 1 -->
            <div class="col-12 col-md-4">
                <div class="p-4 border rounded-4 bg-light position-relative overflow-hidden h-100">
                    <span class="position-absolute end-0 top-0 m-3 text-secondary font-black opacity-10"
                        style="font-size: 2.5rem; font-weight: 900; pointer-events: none;">01</span>
                    <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center font-bold mb-3"
                        style="width: 32px; height: 32px; font-size: 12px;">
                        1
                    </div>
                    <h5 class="fs-6 font-bold text-dark mb-2" style="font-weight: 700;">Examination Day</h5>
                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.6;">
                        Report at 08:00 AM with your companion, Php 300 fee, and decent attire. Complete your
                        examination in designated test rooms.
                    </p>
                </div>
            </div>

            <!-- Card Step 2 -->
            <div class="col-12 col-md-4">
                <div class="p-4 border rounded-4 bg-light position-relative overflow-hidden h-100">
                    <span class="position-absolute end-0 top-0 m-3 text-secondary font-black opacity-10"
                        style="font-size: 2.5rem; font-weight: 900; pointer-events: none;">02</span>
                    <div class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center font-bold mb-3"
                        style="width: 32px; height: 32px; font-size: 12px;">
                        2
                    </div>
                    <h5 class="fs-6 font-bold text-dark mb-2" style="font-weight: 700;">Instant Grade Assessment
                    </h5>
                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.6;">
                        Results will be released immediately after the test. Passing candidates immediately
                        proceed to Briefing. Interview options available for borderline scores.
                    </p>
                </div>
            </div>

            <!-- Card Step 3 -->
            <div class="col-12 col-md-4">
                <div
                    class="p-4 border rounded-4 bg-success bg-opacity-10 border-success border-opacity-10 position-relative overflow-hidden h-100">
                    <span class="position-absolute end-0 top-0 m-3 text-success font-black opacity-10"
                        style="font-size: 2.5rem; font-weight: 900; pointer-events: none;">03</span>
                    <div class="rounded-circle text-white d-flex align-items-center justify-content-center font-bold mb-3"
                        style="width: 32px; height: 32px; font-size: 12px; background-color: var(--bma-dark-green)">
                        3
                    </div>
                    <h5 class="fs-6 font-bold text-dark mb-2" style="font-weight: 700;">Mandatory Briefing
                        Session</h5>
                    <p class="text-secondary m-0" style="font-size: 11px; line-height: 1.6;">
                        Discuss critical items: Academy policies, full enrollment procedures, medical
                        guidelines, and tuition structures.
                    </p>
                </div>
            </div>

        </div>
    </section>
</template>
<script>
export default {
    name: 'ExaminationCard',
    props: {
        examinationData: Object
    },
    data() {
        return {
            value: [],
            payment: false,
            examinationCode: this.examinationData?.examination_code || '',
            errors: []
        }
    },
    methods: {
        convertDate(date) {
            date = new Date(date)
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'/* ,
                hour: 'numeric',
                minute: 'numeric',
                hour12: true */
            }
            const formatter = new Intl.DateTimeFormat('en-US', options)
            return formatter.format(date)
        }
    }
}
</script>