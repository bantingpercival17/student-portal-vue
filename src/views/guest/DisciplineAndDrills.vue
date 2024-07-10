<template>
    <image-title-header titleHeader="DISCIPLINE & DRILLS" :banner="require('@/assets/resources/banner/banner-5.jpg')"
        topValue="80%" />
    <div class="container-fluid mt-5">
        <div class="card ">
            <div class="card-body row">
                <div class="col-lg-6 col-md-12">
                    <label for="" class="text-primary fw-bolder display-6">
                        NORM AND DECOROMS
                    </label>
                    <p>
                        Baliwag Maritime Academy upholds high standards of discipline and professionalism. Students are
                        expected to adhere to a dress code, maintain punctuality, and exhibit respectful behavior.
                        Academic integrity is paramount, with a zero-tolerance policy for cheating and plagiarism.
                        Active participation in classes and training is encouraged to develop essential maritime skills.
                        Safety protocols and respect for property are strictly enforced. The academy emphasizes
                        professional conduct, preparing students for successful careers in the maritime industry.
                    </p>
                </div>
                <div class="col-lg-6 col-md-12">
                    <iframe src="http://bma.edu.ph/assets/video/CZGqsWPcRkuN.mp4" width="560" height="314"
                        style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen="true"></iframe>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import ImageTitleHeader from '@/components/main-layouts/components/widgets/ImageTitleHeader.vue'
export default {
    name: 'Discipline&Drills',
    components: {
        ImageTitleHeader
    }
}
</script>
