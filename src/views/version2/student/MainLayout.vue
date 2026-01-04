<template>
    <!--  <SideNavigation class="is-open" @close-sidebar="isSidebarOpen = false" /> -->
    <SideNavigation :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />
    <div class="sidebar-backdrop" v-if="isSidebarOpen" @click="isSidebarOpen = false"></div>
    <div class="main-student-content d-flex flex-column ">
        <MainHeader @toggle-sidebar="toggleSidebar" />
        <div class="pt-3">
            <router-view />
        </div>
    </div>
</template>
<script>
import MainHeader from './components/MainHeader.vue'
import SideNavigation from './components/SideNavigation.vue'
export default {
    name: 'StudentMainLayout',
    components: {
        SideNavigation,
        MainHeader
    },
    data() {
        return {
            isSidebarOpen: false
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen
            console.log(this.isSidebarOpen)
        }
    }
}
</script>
<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";

/* General Body and App Layout */
html {
    font-size: 15px;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f8f9fa;
    /* Cleaner, cooler light gray */
    color: #495057;
    /* Softer text color */
}

#app {
    display: flex;
    height: 100vh;
    width: 100%;
}

.main-student-content {
    flex-grow: 1;
    overflow-y: auto;
    transition: margin-left 0.3s ease;
    min-width: 0;
    padding: 1.5rem;
    /* Add padding to main content area */
}

/* Typography */
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
    font-weight: 600;
    letter-spacing: -0.025em;
    /* Tighter letter spacing for headings */
    color: #212529;
}

/* Custom Scrollbar Styling */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-student nav::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(218, 165, 32, 0.5);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgba(218, 165, 32, 0.7);
}


/* Sidebar Styling */
.sidebar-student {
    width: 280px;
    background: linear-gradient(180deg, #2c5234, #213d28);
    color: white;
    flex-shrink: 0;
    transition: transform 0.3s ease;
    z-index: 1050;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.sidebar-student .nav-link {
    color: white;
    display: flex;
    align-items: center;
    padding: 0.85rem 1.25rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s, color 0.2s, transform 0.2s;
    margin-bottom: 0.25rem;
    font-weight: 500;
    /* Slightly bolder font for nav links */
}

.sidebar-student .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.sidebar-student .nav-link.active {
    background-color: #DAA520;
    color: #213d28;
    font-weight: 700;
}

.sidebar-student nav {
    overflow-y: auto;
    flex-grow: 1;
}

.sidebar-student-profile {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-student .btn-outline-light {
    color: white;
    border-color: rgba(255, 255, 255, 0.5);
}

.sidebar-student .btn-outline-light:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: white;
}

/* Header Styling */
.main-student-header {
    background-color: #f8f9fa;
    /* Match body background */
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #dee2e6;
}

.header-avatar {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border: 2px solid #298340;
    cursor: pointer;
}

/* Card Styling */
.card {
    border: none;
    /* Remove borders for a cleaner look */
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    /* Softer shadow */
    border-radius: 0.75rem;
}

.card-header {
    background-color: #fff;
    border-bottom: 1px solid #f1f5f9;
    /* Lighter border color */
    padding: 1rem 1.25rem;
}

.card-body {
    padding: 1.25rem;
    /* Standardized padding */
}

/* Button Styling */
.btn {
    transition: all 0.2s ease-in-out;
    font-weight: 600;
}

.btn-primary {
    background-color: #DAA520;
    border-color: #DAA520;
    color: #213d28;
}

.btn-primary:hover {
    background-color: #c8961e;
    border-color: #c8961e;
    transform: translateY(-2px);
    color: #213d28;
}

.btn-success {
    background-color: #2c5234;
    border-color: #2c5234;
}

.btn-success:hover {
    background-color: #213d28;
    border-color: #213d28;
    transform: translateY(-2px);
}

.btn-dark {
    background-color: #333;
    border-color: #333;
}

.btn-dark:hover {
    background-color: #222;
    border-color: #222;
    transform: translateY(-2px);
}

.btn-outline-secondary:hover {
    transform: translateY(-2px);
}

/* Table Styling */
.table {
    border-collapse: separate;
    border-spacing: 0;
}

.table thead th {
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: #6c757d;
    border-bottom-width: 1px;
}

.table td,
.table th {
    vertical-align: middle;
}


/* Digital ID Card Flip Animation */
.id-card-container {
    perspective: 1000px;
}

.id-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.id-card-container.is-flipped .id-card-inner {
    transform: rotateY(180deg);
}

.id-card-front,
.id-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5rem;
}

.id-card-back {
    transform: rotateY(180deg);
}

.kalam-font {
    font-family: 'Kalam', cursive;
}

/* Stepper Styling */
.stepper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    flex: 1;
}

.stepper-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #e2e8f0;
    color: #718096;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid;
    transition: all 0.3s ease;
}

.stepper-label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.stepper-line {
    position: absolute;
    top: 16px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #e2e8f0;
    transform: translateY(-50%);
    z-index: -1;
    transition: background-color 0.3s ease;
}

.stepper-item:last-child .stepper-line {
    display: none;
}

.stepper-item.completed .stepper-circle {
    background-color: #2c5234;
    color: white;
    border-color: #2c5234 !important;
}

.stepper-item.completed .stepper-line {
    background-color: #2c5234;
}

.stepper-item.active .stepper-circle {
    background-color: #DAA520;
    color: white;
    border-color: #DAA520 !important;
}

/* Calendar Styling */
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
    border: 1px solid #f1f5f9;
    padding: 0.5rem;
    min-height: 120px;
    font-size: 0.8rem;
    overflow: hidden;
}

.calendar-day.not-in-month {
    background-color: #f8fafc;
    color: #cbd5e1;
}

.day-number {
    font-weight: bold;
}

.calendar-day.today .day-number {
    background-color: #DAA520;
    color: #213d28;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.event-dot {
    padding: 2px 4px;
    border-radius: 4px;
    margin-top: 4px;
    white-space: normal;
    word-wrap: break-word;
    display: block;
}

/* Help Button & Modal */
.help-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1030;
}

.chat-message {
    display: flex;
}

.chat-message.user {
    justify-content: flex-end;
}

.chat-message.user .message-content {
    background-color: #2c5234;
    color: white;
}

.chat-message.support .message-content {
    background-color: #e9ecef;
    color: #495057;
}

.message-content {
    max-width: 80%;
}

.notification-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1100;
}

/* Accordion Customization */
.accordion-button:not(.collapsed) {
    background-color: #fdfbf5;
    color: #213d28;
    font-weight: 600;
}

.accordion-button:focus {
    box-shadow: 0 0 0 0.25rem rgba(218, 165, 32, 0.25);
}

/* LMS Card Styling */
.course-card {
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.course-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.course-card-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #f1f5f9;
}

.course-card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.course-progress {
    margin-top: auto;
    /* Push progress bar to the bottom */
}

/* Course Detail page (Moodle style) & Onboard Training Tabs */
.module-resource {
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
}

.module-resource:last-child {
    border-bottom: none;
}

.nav {
    background-color: transparent;
}

.nav-tabs .nav-link {
    color: #6c757d;
    border-radius: 0.5rem 0.5rem 0 0;
}

.nav-tabs .nav-link.active {
    background-color: #fff;
    color: #213d28;
    border-color: #dee2e6 #dee2e6 #fff;
    font-weight: 600;
}

.nav-tabs {
    border-bottom-color: #dee2e6;
}

/* Notification Styling */
.notification-item.unread {
    background-color: #fdfbf5;
}

.notification-item a {
    text-decoration: none;
    color: inherit;
}

.notification-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}

/* Responsive Styles */
.sidebar-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    display: none;
}

.sidebar-student.is-open+.sidebar-backdrop {
    display: block;
}

#vesselMap {
    height: 300px;
    border-radius: 0.5rem;
}

@media (max-width: 900px) {
    .sidebar-student {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        transform: translateX(-100%);
    }

    .sidebar-student.is-open {
        transform: translateX(0);
    }

    .main-student-content {
        width: 100%;
        padding: 1rem;
    }
}
</style>