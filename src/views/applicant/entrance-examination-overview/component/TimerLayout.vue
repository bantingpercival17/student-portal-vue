<template>
    <div>
        <span class="fw-bolder text-muted h6">EXAM TIMER: </span>
        <span class="fw-bolder text-info h6">{{ remainingTime }}</span>
    </div>
</template>
<script>
export default {
    name: 'TimerComponent',
    props: {
        startingTime: String,
        finishFunction: Function
    },
    data() {
        const duration = 60 * 60 * 2000
        const startTime = new Date(this.startingTime)
        const baseStartTime = startTime.getTime()
        const baseEndTime = new Date(baseStartTime + duration)
        return {
            // eslint-disable-next-line vue/no-computed-properties-in-data
            currentExamTime: this.startingTime ? new Date(this.startingTime).getTime() : this.currentExamTime,
            endTime: baseEndTime,
            remainingTime: this.formattedTime(baseEndTime)
        }
    },
    mounted() {
        this.updateTime(this.endTime)
    },
    beforeUnmount() {
        clearInterval(this.timerInterval) // Clear the interval when the component is destroyed
    },
    methods: {
        updateTime(endTime) {
            setInterval(() => {
                this.remainingTime = this.formattedTime(endTime)
            }, 1000) // Update every second
        },
        formattedTime(endTime) {
            const now = new Date().getTime() // Get the Current Time
            const distance = endTime.getTime() - now
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((distance % (1000 * 60)) / 1000)
            if (hours < '10') {
                hours = hours > 0 ? ('0' + hours) : '00'
            }
            if (minutes < '10') {
                minutes = minutes < 0 ? '00' : '0' + minutes
            }
            if (seconds < '10') {
                seconds = seconds < 0 ? '00' : '0' + seconds
            }
            if (distance < 0) {
                this.finishFunction()
            }
            return hours + ':' + minutes + ':' + seconds
        }
    }
}
</script>