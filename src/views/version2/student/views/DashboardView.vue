<template>
    <!-- Row 1: Maritime Widgets -->
    <div class="row g-4 mb-4">
        <div class="col-12 col-lg-4">
            <div class="card h-100 p-3 text-center bg-primary text-white">
                <h5 class="card-title small fw-bold mb-1">LOCAL TIME (PHT)</h5>
                <p class="display-6 fw-bold mb-0">{{ localTime }}</p>
            </div>
        </div>
        <div class="col-12 col-lg-4">
            <div class="card h-100 p-3 text-center bg-dark text-white">
                <h5 class="card-title small fw-bold mb-1">SHIP'S TIME (UTC)</h5>
                <p class="display-6 fw-bold mb-0">{{ utcTime }}</p>
            </div>
        </div>
    </div>
</template>
<script>

/* eslint-disable */
export default {
    name: 'StudentDashboardViewV2',
    data() {
        return {
            localTime: '',
            utcTime: ''
        }
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.localTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            this.utcTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'UTC' });
        },
    }
}
</script>