<template>
    <image-title-header titleHeader="ONBOARD TRAINING" :banner="require('@/assets/resources/banner/banner-4.jpg')"
        topValue="80%" />
    <div class="container-fluid mt-5">
        <div class="card">
            <div class="card-body">
                <div class="text-center">
                    <label for="" class="text-primary fw-bolder display-6">
                        CADETSHIP AND EMPLOYMENT
                    </label>
                </div>
                <p>Fourth-Year Cadets who meet BMA's criteria and maintain satisfactory disciplinary standards are
                    afforded
                    priority
                    consideration for shipboard apprenticeships aboard vessels operated and manned by Baliwag
                    Navigation,
                    Inc.
                    (BNI). BMA stands out as one of the few maritime institutions offering practical shipboard training
                    facilitated
                    within its own fleet, providing comprehensive experiential learning opportunities.</p>

                <div class="section">
                    <div>
                        <h2 class="fw-bolder">Cadetship Opportunities</h2>
                        <p>Fourth-Year Cadets who meet BMA's criteria and maintain satisfactory disciplinary standards
                            receive
                            priority for shipboard apprenticeships aboard BNI vessels.</p>
                    </div>
                </div>

                <div class="section">
                    <div>
                        <h2 class="fw-bolder">Experiential Learning</h2>
                        <p>BMA offers practical shipboard training within its own fleet, providing cadets with
                            comprehensive
                            experiential learning opportunities.</p>
                    </div>
                </div>

                <div class="section">
                    <div>
                        <h2 class="fw-bolder">Employment Prospects</h2>
                        <p>Graduates who excel during their apprenticeships and exhibit commendable academic performance
                            are
                            presented with employment prospects, contingent upon fulfilling all requisite conditions.
                        </p>
                    </div>
                </div>

                <div class="section">
                    <div>
                        <h2 class="fw-bolder">Officer Training Program</h2>
                        <p>Successful candidates, upon completing mandated examinations and obtaining the requisite
                            licensure, are
                            integrated into the BNI Corps of Shipboard Officers through a structured training program.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="text-center">
                    <label for="" class="text-primary fw-bolder display-6">
                        AFFILIATED SHIPPING COMPANIES
                    </label> <br>
                    <div class="text-center row mt-5">
                        <div class="col-md-4" v-for="(data, index) in companies" :key="index">
                            <a :href="data.link" class="text-center">
                                <img :src="data.image" :alt="data.code_name" height="50%"> <br>
                                <label for="" class="text-primary fw-bolder">{{ data.name }}</label>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scope>
h1 {
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 20px;
}

p {
    font-size: 1.2em;
    line-height: 1.6;
}

.section {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.section img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
}

.section h2 {
    font-size: 1.5em;
    margin: 0;
}

.section p {
    font-size: 1em;
    margin-left: 10px;
}
</style>
<script>
import ImageTitleHeader from '@/components/main-layouts/components/widgets/ImageTitleHeader.vue'
export default {
    name: 'OnboardTraining',
    data() {
        const companies = [
            { code_name: 'BNI', name: 'Baliwag Navigation, INC', link: 'https://www.facebook.com/BaliwagNavigation', image: require('@/assets/resources/company/BNI.png') },
            { code_name: 'TCC', name: 'Tai Chong Cheang Steamship Co.', link: 'https://www.tccfleet.com/', image: require('@/assets/resources/company/TCC.png') },
            { code_name: 'MMSL', name: 'MMSL JAPAN LTD', link: 'https://www.mmsl.co.jp/english/index.html', image: require('@/assets/resources/company/MMSL.png') }
        ]
        return {
            companies
        }
    },
    components: {
        ImageTitleHeader
    }
}
</script>
