<template>
    <div>
        <div class="timeline-dots1 border-info text-info">
            <svg width="20" viewBox="0 2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M7.67 2H16.34C19.73 2 22 4.38 22 7.92V16.09C22 19.62 19.73 22 16.34 22H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2ZM7.52 13.2C6.86 13.2 6.32 12.66 6.32 12C6.32 11.34 6.86 10.801 7.52 10.801C8.18 10.801 8.72 11.34 8.72 12C8.72 12.66 8.18 13.2 7.52 13.2ZM10.8 12C10.8 12.66 11.34 13.2 12 13.2C12.66 13.2 13.2 12.66 13.2 12C13.2 11.34 12.66 10.801 12 10.801C11.34 10.801 10.8 11.34 10.8 12ZM15.28 12C15.28 12.66 15.82 13.2 16.48 13.2C17.14 13.2 17.67 12.66 17.67 12C17.67 11.34 17.14 10.801 16.48 10.801C15.82 10.801 15.28 11.34 15.28 12Z"
                    fill="currentColor"></path>
            </svg>
        </div>
        <h5 class="float-left mb-1 text-info fw-bolder">
            {{ viewName }}

        </h5>
        <div v-if="propsDeployment" class="d-inline-block w-100">
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-group">
                        <label for="example-text-input" class="form-control-label fw-bolder">
                            <small>SHIPPING AGENCY<span class="text-danger">*</span></small>
                        </label>
                        <label for="" class="form-control">{{ shippingCompany }}</label>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12" v-for="(item, index) in propsDocuments" :key="index">
                    <div class="form-group" v-for="(studentDocument, index2) in propsAttachment" :key="index2">
                        <div class="content-form" v-if="item.id == studentDocument.document_id">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>{{ item.document_name }}</small>
                            </label>
                            <div class="document-status">
                                <div v-if="studentDocument.document_status === null || studentDocument.document_status == 0"
                                    class="document-under-verification">
                                    <span class="text-info fw-bolder">This Document is under
                                        verification</span>
                                </div>
                                <div v-else>
                                    <div v-if="studentDocument.document_status == 1" class="document-approved">
                                        <p class="m-0 p-0">
                                            <small>DOCUMENT STATUS: </small>
                                            <small for="" class="form-small text-primary fw-bolder">APPROVED
                                                DOCUMENT</small>
                                        </p>
                                        <div class="row">
                                            <div class="col-6">
                                                <p class="m-0 p-0"><small>VERIFIED BY: </small> <br>
                                                    <small for="" class="text-muted fw-bolder">
                                                        {{ studentDocument.staff ? studentDocument.staff.first_name + ' ' +
                                                            studentDocument.staff.last_name : '' }}
                                                    </small>
                                                </p>
                                            </div>
                                            <div class="col-6">
                                                <p class="m-0 p-0"><small>VERIFIED DATE: </small> <br>
                                                    <small for="" class="text-muted fw-bolder">
                                                        {{ studentDocument.updated_at }}
                                                    </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="document-disapproved">
                                        <p class="m-0 p-0">
                                            <small>DOCUMENT STATUS: </small>
                                            <small for="" class="form-small text-danger fw-bolder">DISAPPROVED
                                                DOCUMENT</small>
                                        </p>
                                        <p class="m-0 p-0">
                                            <small>REMARKS: </small>
                                            <small for="" class="form-small text-info fw-bolder">{{
                                                studentDocument.document_comment }}</small>
                                        </p>
                                        <form @submit.prevent="reuploadDocument" method="post">
                                            <div class="form-group">
                                                <label for="example-text-input" class="form-control-label fw-bolder">
                                                    <small>RE-UPLOAD DOCUMENT<span class="text-danger">*</span></small>
                                                </label>
                                                <div class="row">
                                                    <div class="col-lg-8 col-md-10">
                                                        <input type="file"
                                                            class="form-control form-control-sm border border-primary"
                                                            :name="`file${index}`" ref="files"
                                                            @change="onFileChange(index, item.document_name.replaceAll(' ', '_').toLowerCase())" />
                                                    </div>
                                                    <div class="col-lg-4 col-md-2">
                                                        <button type="submit" class="btn btn-sm btn-primary w100">UPLOAD</button>
                                                    </div>
                                                </div>
                                                <span class="badge bg-danger mt-2"
                                                    v-if="errors[item.document_name.toLowerCase().replaceAll(' ', '_')]">{{
                                                        errors[item.document_name.toLowerCase().replaceAll(' ', '_')][0]
                                                    }}</span>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-inline-block w-100">
            <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-lg-12">
                        <selectComponent label="Shipping agency" :data="propsCompany" v-model:value="agency"
                            :error="errors.agency" />
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="0" v-model="otherShipping">
                            <small class="form-check-label validate-checkbox" for="flexCheckDefault1">
                                Other Shipping Company
                            </small>
                        </div>

                    </div>
                    <div v-if="otherShipping" class="shipping-company">
                        <div class="col-lg-6 col-md-12">
                            <inputComponent label="Shipping Company" v-model:value="shippingCompany"
                                :error="errors.shipping_company" />
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <inputComponent label="Company Address" v-model:value="companyAddress"
                                :error="errors.company_address" />
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12" v-for="(item, index) in propsDocuments" :key="index">
                        <div class="form-group">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>{{ item.document_name }}<span class="text-danger">*</span></small>
                            </label>
                            <input type="hidden" :value="item.id" name="documents">
                            <input type="file" class="form-control border border-primary" :name="`file${index}`" ref="files"
                                @change="onFileChange(index, item.document_name.replaceAll(' ', '_').toLowerCase())" />
                            <span class="badge bg-danger mt-2"
                                v-if="errors[item.document_name.toLowerCase().replaceAll(' ', '_')]">{{
                                    errors[item.document_name.toLowerCase().replaceAll(' ', '_')][0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group float-right">
                    <button class="btn btn-primary w-100" type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import { GET_USER_TOKEN, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component-v2.vue'
export default {
    name: 'DocumentRequirments',
    components: {
        inputComponent,
        selectComponent
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    data() {
        const formData = new FormData()
        var shippingCompany = ''
        if (this.propsDeployment.shipboard_companies) {
            shippingCompany = this.propsDeployment.shipboard_companies.agency_name
            console.log(shippingCompany)
        }

        return {
            viewName: 'STEP 1 : DOCUMENT REQUIREMENTS',
            files: [],
            errors: [],
            error: '',
            agency: '',
            formData,
            otherShipping: false,
            shippingCompany,
            companyAddress: ''
        }
    },
    methods: {
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        onFileChange(index, id) {
            const file = this.$refs.files[index].files[0]
            this.formData.append(id.toString(), file)
        },
        async submitForm() {
            if (this.otherShipping === false) {
                this.formData.append('agency', this.agency)
            } else {
                this.agency = 'NA'
                this.formData.append('agency', 'NA')
                this.formData.append('shipping_company', this.shippingCompany)
                this.formData.append('company_address', this.companyAddress)
            }
            this.showLoading(true)
            axios.post('/student/onboard/enrollment', this.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                console.log(response)
            }).catch((error) => {
                this.showLoading(false)
                console.log(error)
                if (error.response.status === 422) {
                    console.log(error.response.data)
                    this.errors = error.response.data.errors
                }
            })
        },
        async reuploadDocument(){

        }
    },
    props: { propsCompany: Object, propsDocuments: Object, propsDeployment: Object, propsAttachment: Object }
}
</script>