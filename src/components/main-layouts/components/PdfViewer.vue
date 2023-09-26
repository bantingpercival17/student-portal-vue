<template>
    <div>
        <div class="pdf-controls">
            <button @click="prevPage">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage">Next</button>
        </div>
        <pdf ref="pdf" :src="pdfSrc" @num-pages="setTotalPages" @page-loaded="pageLoaded" @page-rendered="pageRendered"
            :page="currentPage"></pdf>
    </div>
</template>
<script>
import pdfjs from 'pdfjs-dist/build/pdf'
import { pdf } from 'vue-pdf'
export default {
    components: {
        pdf// Register the pdf component
    },
    data() {
        return {
            pdfSrc: this.pdfUrl, // Replace with your PDF file path
            totalPages: 0,
            currentPage: 1,
            pdfInstance: null
        }
    },
    methods: {
        setTotalPages(totalPages) {
            this.totalPages = totalPages
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        pageLoaded(page) {
            this.pdfInstance = page
        },
        pageRendered() {
            // You can perform additional actions after each page is rendered.
        }
    },
    watch: {
        currentPage() {
            if (this.pdfInstance) {
                this.pdfInstance.cleanup()
            }
        }
    },
    props: { pdfUrl: String }
}
</script>
<style>
.pdf-controls {
    text-align: center;
    margin-bottom: 20px;
}

button {
    margin: 5px;
}
</style>