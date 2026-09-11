<template>
    <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title fw-bold text-white"><i class="bi bi-ship me-2"></i>Add New Sea Service Vessel
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <ShipboardApplicationCard :shipping-agencies="vesselDetails?.shippingAgenciesList"
                        :vessel-type="vesselDetails?.vesselType" :document-list="vesselDetails?.documents"
                        @loading="loaderStatus" />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-danger mt-2 btn-sm w-100" @click="closeModal">Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ShipboardApplicationCard from '../components/ShipboardApplicationCard.vue'

export default {
    name: 'AddVesselModal',
    props: {
        vesselDetails: Object
    },
    components: {
        ShipboardApplicationCard
    },
    data() {
        return {
            formData: { ...this.profileData }
        }
    },
    methods: {
        closeModal() {
            this.$emit('update:modelValue', false) // Close the modal
        },
        loaderStatus(data) {
            this.contentLoader = data
        }
    }
}
</script>