<template>
    <image-title-header titleHeader="PUBLICATION" :banner="require('@/assets/resources/banner/banner-3.jpg')"
        topValue="80%" />
    <div class=" container mt-5">
        <div class="row">
            <div class="col-md-5">
                <div class="card mb-3">
                    <div class="card-body">
                        <label for="" class="text-primary fw-bolder display-6">
                            {{ dataList[articleIndex].titleName }}
                        </label>
                        <span class="badge bg-primary">{{ dataList[articleIndex].author }}</span>
                        <p class="mt-3">
                            {{ dataList[articleIndex].description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="rounded rounded-5" v-html="dataList[articleIndex].frameUrl"></div>
            </div>
        </div>

        <div class="container my-4">
            <h2 class="text-center text-primary fw-bolder">PREVIOUS MONTHLY FEATURES</h2>
            <div id="featuresGrid" class="features-grid row g-4">
                <template v-for="(item, index) in visibleData" :key="index">
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 text-center shadow-sm border-0">
                            <div class="card-body" v-if="index !== articleIndex">
                                <h5 class="text-primary fw-bold mb-3">{{ item.titleName }}</h5>
                                <p class="text-muted">{{ item.description }}</p>
                                <button class="btn btn-primary w-100 fw-semibold" @click="openArticle(index)">
                                    READ MORE
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <!-- Show More button -->
            <div class="text-center mt-4" v-if="visibleCount < dataList.length">
                <button class="btn btn-outline-primary px-4" @click="loadMore">
                    VIEW MORE
                </button>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import ImageTitleHeader from '@/components/main-layouts/components/widgets/ImageTitleHeader.vue'
export default {
    name: 'Publication',
    components: {
        ImageTitleHeader
    },
    data() {
        const dataList = [{
            titleName: 'SEPTEMBER 2024 MONTHLY FEATURE',
            author: 'DOLPHIN PUBLICATIONS',
            frameUrl: `<iframe class="w-100"
                        src="http://one.bma.edu.ph/assets/documents/publication/SEPTEMBER-2024.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: 'The new academic year starts as Baliwag Maritime Academy Welcomes Mabalasik Class of 2027 with a Dynamic Five-Day Orientation Program designed to equip cadets with essential knowledge and skills for their maritime journey'
        },
        {
            titleName: 'OCTOBER 2024 MONTHLY FEATURE',
            author: 'DOLPHIN PUBLICATIONS',
            frameUrl: `<iframe class="w-100"
                        src="http://one.bma.edu.ph/assets/documents/publication/OCTOBER-2024.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: 'The month of October came to bring surprises as Solpia Management opened doors to BMA Cadets for maritime career opportunities.'
        },
        {
            titleName: 'NOVEMBER 2024 MONTHLY FEATURE',
            author: 'DOLPHIN PUBLICATIONS',
            frameUrl: `<iframe class="w-100"
                        src="http://one.bma.edu.ph/assets/documents/publication/NOVEMBER-2024.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: 'BMA showcases its commitment in embracing EXCELLENCE through Quality Management under 9001:2015 Standards carried out by Class NK. Words of wisdom about Perseverance, Courage and Ambition, and Humility.'
        },
        {
            titleName: 'DECEMBER 2024 MONTHLY FEATURE',
            author: 'DOLPHIN PUBLICATIONS',
            frameUrl: `<iframe class="w-100"
                        src="http://one.bma.edu.ph/assets/documents/publication/DECEMBER-2024.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: 'The Christmas Spirit flows at BMA in the month of December. BMA cadets kicks off Christmas caroling. CMG’s ministry of giving at Bukal ng Buhay Orphanage. The demonstration of camaraderie between the midshipmen and the faculty members during the annual Christmas Party.'
        },
        {
            titleName: 'JANUARY 2025 MONTHLY FEATURE',
            author: 'DOLPHIN PUBLICATIONS',
            frameUrl: `<iframe class="w-100"
                        src="http://one.bma.edu.ph/assets/documents/publication/JANUARY-2025.pdf#toolbar=0&navpanes=0&scrollbar=0"
                        height="696" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allowfullscreen="true"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`,
            description: 'The Christmas Spirit flows at BMA in the month of December. BMA cadets kicks off Christmas caroling. CMG’s ministry of giving at Bukal ng Buhay Orphanage. The demonstration of camaraderie between the midshipmen and the faculty members during the annual Christmas Party.'
        }]
        return {
            articleIndex: dataList.length - 1,
            dataList,
            visibleCount: 3
        }
    }, computed: {
        visibleData() {
            return this.dataList.slice(0, this.visibleCount);
        },
    }, methods: {
        loadMore() {
            this.visibleCount += 3;
        },

        openArticle(index) {
            this.articleIndex = index;
            window.scrollTo(0, 0);
        },
    }
}
</script>