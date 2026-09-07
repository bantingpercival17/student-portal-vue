<template>
    <div class="card ms-5 me-5">
        <div class="card-header p-3">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT'S INFORMATION</label>
                <br>
                <small for="" class="text-danger">
                    NOTE: Please ensure that all information/details are correct and filled in,
                    type/choose N / A if not applicable
                </small>
            </div>
        </div>
        <div class="card-body">
            <div v-if="isLoading">
                <h2 class="fw-bolder text-info">LOADING</h2>
            </div>
            <div v-else>
                <form @submit.prevent="storeDetails" method="post">
                    <label for="" class="text-primary fw-bolder h4">STUDENT'S DETAILS</label>
                    <div class="row">
                        <div class="col-xl col-md">
                            <input-component label="LAST NAME" v-model:value="formData.last_name"
                                :error="errors.last_name" />
                        </div>
                        <div class="col-xl col-md">
                            <input-component label="FIRST NAME" v-model:value="formData.first_name"
                                :error="errors.first_name" />
                        </div>
                        <div class="col-xl col-md">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>MIDDLE NAME</small>
                                </label>
                                <input class="form-control form-control-sm border border-primary"
                                    v-model="formData.middle_name" :disabled="noMiddleName">
                                <div class="form-check">
                                    <input class="form-check-input input-middle-name" type="checkbox"
                                        v-model="noMiddleName" id="flexCheckDefault1">
                                    <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                        for="flexCheckDefault1">
                                        I don't have a Middle Name
                                    </small>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.middle_name">
                                    {{ errors.middle_name[0] }}
                                </span>
                            </div>
                        </div>
                        <div class="col-xl-2 col-md">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>EXTENSION NAME</small>
                                </label>
                                <input class="form-control form-control-sm border border-primary"
                                    v-model="formData.extention_name" :disabled="noExtensionName">
                                <div class="form-check">
                                    <input class="form-check-input input-middle-name" type="checkbox"
                                        v-model="noExtensionName" id="flexCheckDefault1">
                                    <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                        for="flexCheckDefault1">
                                        I don't have an Extension Name
                                    </small>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.extension_name">
                                    {{ errors.extension_name[0] }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-md">
                            <select-component label="Gender" v-model:value="formData.sex" :error="errors.gender"
                                :data="options.genderOption" />
                        </div>

                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="HEIGHT - CM" v-model:value="formData.height" :error="errors.height"
                                :data="options.heightOption" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component-v2 label="WEIGHT - LBS" v-model:value="formData.weight" columnName="label"
                                :error="errors.weight" :data="options.weightOption" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-4 mb-xl-0">
                            <inputComponentV2 label="BIRTH DATE" type="date" v-model:value="formData.birthday"
                                :error="errors.birth_date" />
                        </div>
                        <div class="col-xl-9 col-md-8 mb-xl-0">
                            <input-component label="BIRTH PLACE" v-model:value="formData.birth_place"
                                :error="errors.birthPlace" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="Civil Status" v-model:value="formData.civil_status"
                                :error="errors.civil_status" :data="options.civilStatusList" />
                            <!-- <input-component label="CIVIL STATUS" v-model:value="civilStatus"
                                :error="errors.civil_status" /> -->
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="NATIONALITY" v-model:value="formData.nationality"
                                :error="errors.nationality" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="Religion" v-model:value="formData.religion"
                                :error="errors.religion" :data="options.religionsOption" />
                            <!-- <input-component label="RELIGION" v-model:value="formData.religion"
                                :error="errors.religion" /> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="CONTACT NUMBER" v-model:value="formData.contact_number"
                                :error="errors.contact_number" />
                        </div>
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="EMAIL" v-model:value="formData.email"
                                :error="errors.personal_email" />

                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">ADDRESS</label>
                    <div class="row">
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <div class="form-group">
                                <label for="provinceSelect" class="form-control-label fw-bolder">
                                    <small>PROVINCE <span class="text-danger">*</span></small>
                                </label>

                                <select v-model="formData.province"
                                    class="form-select form-select-sm border border-primary" id="provinceSelect">
                                    <option value="">Select Province</option>
                                    <option v-for="item in provinceOption" :key="item.province_code"
                                        :value="item.province_name" :data-value="item.province_code">
                                        {{ item.province_name }}
                                    </option>
                                    <option value="other">Other (Input your province)</option>
                                </select>

                                <input v-if="isCustomProvince" v-model="customProvince"
                                    class="form-control form-control-sm border border-primary mt-2"
                                    placeholder="Enter your province" />

                                <span class="badge bg-danger mt-2" v-if="errors.province">
                                    {{ errors.province[0] }}
                                </span>
                            </div>

                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>MUNICIPALITY <span class="text-danger">*</span></small>
                            </label>
                            <select v-model="formData.municipality"
                                class="form-select form-select-sm border border-primary">
                                <option value="">Select MUNICIPALITY</option>
                                <option v-for="item in municipalityOption" :key="item" :value="item.city_name"
                                    :data-value="item.city_code">
                                    {{ item.city_name }}</option>
                                <option value="other">Other (Input your municipality)</option>
                            </select>
                            <input v-if="isCustomMunicipality" v-model="customMunicipality"
                                class="form-control form-control-sm border border-primary mt-2"
                                placeholder="Enter your Municipality" @input="setCustomMunicipality" />
                            <span class="badge bg-danger mt-2" v-if="errors.municipality">
                                {{ errors.municipality[0] }}
                            </span>
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <label for="example-text-input" class="form-control-label fw-bolder">
                                <small>BARANGAY <span class="text-danger">*</span></small>
                            </label>
                            <select v-model="formData.barangay" class="form-select form-select-sm border border-primary"
                                @change="optionChangeHandle">
                                <option value="">Select BARANGAY</option>
                                <option v-for="item in barangayOption" :key="item" :value="item.brgy_name"
                                    :data-value="item.brgy_code">
                                    {{ item.brgy_name }}</option>
                                <option value="other">Other (Input your Barangay)</option>
                            </select>
                            <input v-if="isCustomBarangay" v-model="customBarangay"
                                class="form-control form-control-sm border border-primary mt-2"
                                placeholder="Enter your Barangay" @input="setCustomBarangay" />
                            <span class="badge bg-danger mt-2" v-if="errors.barangay">
                                {{ errors.barangay[0] }}
                            </span>
                        </div>
                        <div class="col-xl-8 col-md-6 mb-xl-0">
                            <input-component label="HOUSE NO. / STREET / BLDG NO" v-model:value="formData.street"
                                :error="errors.street" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="ZIP CODE" v-model:value="formData.zip_code"
                                :error="errors.zip_code" />
                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">EDUCATIONAL DETAILS</label>
                    <div class="educational-details">
                        <div class="Elementary School">
                            <label for="" class="text-muted fw-bolder h6">Elementary School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name" v-model:value="formData.elementary_school_name"
                                        :error="errors.elementary_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address"
                                        v-model:value="formData.elementary_school_address"
                                        :error="errors.elementary_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="GRADATION DATE" type="date"
                                        v-model:value="formData.elementary_school_year"
                                        :error="errors.elementary_school_year" />
                                </div>
                            </div>
                        </div>
                        <div class="Junior High School">
                            <label for="" class="text-muted fw-bolder h6">Junior High School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name"
                                        v-model:value="formData.junior_high_school_name"
                                        :error="errors.junior_high_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address"
                                        v-model:value="formData.junior_high_school_address"
                                        :error="errors.junior_high_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="GRADATION DATE" type="date"
                                        v-model:value="formData.junior_high_school_year"
                                        :error="errors.junior_high_school_year" />
                                </div>
                            </div>
                        </div>
                        <div v-if="options.educationalAttainment.length > 3">
                            <div class="Junior High School">
                                <label for="" class="text-muted fw-bolder h6">Senior High School</label>
                                <div class="row">
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school name"
                                            v-model:value="formData.senior_high_school_name"
                                            :error="errors.senior_high_school_name" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school address"
                                            v-model:value="formData.senior_high_school_address"
                                            :error="errors.senior_high_school_address" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component-v2 label="GRADATION DATE" type="date"
                                            v-model:value="formData.senior_high_school_year"
                                            :error="errors.junior_high_school_year" />
                                    </div>
                                </div>
                            </div>
                            <select-component label="Senior High School Strand" v-model:value="formData.strand"
                                :error="errors.strand" :data="options.strandList" />
                        </div>
                    </div>
                    <br>
                    <label for="" class="text-primary fw-bolder h4">PARENT DETAILS</label>
                    <div class="father-information">
                        <label for="example-text-input" class="form-control-label text-info"><b>Father's
                                Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="LAST NAME" v-model:value="formData.father_last_name"
                                    :error="errors.father_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="formData.father_first_name"
                                    :error="errors.father_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="formData.father_middle_name"
                                    :error="errors.father_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="formData.father_contact_number"
                                    :error="errors.father_contact_number" />
                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="formData.father_educational_attainment"
                                    :error="errors.father_educational_attainment"
                                    :data="options.educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status"
                                    v-model:value="formData.father_employment_status"
                                    :error="errors.father_employee_status" :data="options.employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement"
                                    v-model:value="formData.father_working_arrangement"
                                    :error="errors.father_arrangement" :data="options.arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="mother-maiden">
                        <label for="example-text-input" class="form-control-label text-info"><b>Mother's Maiden
                                Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="formData.mother_last_name"
                                    :error="errors.mother_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="formData.mother_first_name"
                                    :error="errors.mother_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="formData.mother_middle_name"
                                    :error="errors.mother_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="formData.mother_contact_number"
                                    :error="errors.mother_contact_number" />

                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="formData.mother_educational_attainment"
                                    :error="errors.mother_educational_attainment"
                                    :data="options.educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status"
                                    v-model:value="formData.mother_employment_status"
                                    :error="errors.mother_employment_status" :data="options.employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement"
                                    v-model:value="formData.mother_working_arrangement"
                                    :error="errors.mother_working_arrangement" :data="options.arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="guardian-information">
                        <label for="example-text-input" class="form-control-label text-info"><b>Guardian's
                                Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="formData.guardian_last_name"
                                    :error="errors.guardian_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="formData.guardian_first_name"
                                    :error="errors.guardian_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="formData.guardian_middle_name"
                                    :error="errors.guardian_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="formData.guardian_contact_number"
                                    :error="errors.guardian_contact_number" />
                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="formData.guardian_educational_attainment"
                                    :error="errors.guardian_educational_attainment"
                                    :data="options.educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status"
                                    v-model:value="formData.guardian_employment_status"
                                    :error="errors.guardian_employment_status" :data="options.employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement"
                                    v-model:value="formData.guardian_working_arrangement"
                                    :error="errors.guardian_working_arrangement" :data="options.arrangement" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2 w-100">Submit Student Information</button>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
.text-primary {
    color: #0c4a2b !important;
}

.border-primary {
    border-color: #0c4a2b !important;
}
</style>
<script>
/* eslint-disable no-unused-expressions, no-undef */
/* eslint-disable */
import { ApplicantAdmissionApi } from '@/services/api/ApplicantApi/admissionApi'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import selectComponentV2 from '@/components/main-layouts/components/widgets/select-component-v2.vue'
import options from '@/data/selectOption.json'
import provinceOption from '@/data/address/province.json'
import municipality from '@/data/address/city.json'
import barangay from '@/data/address/barangay.json'
export default {
    name: 'RegistrationForm',
    components: {
        inputComponent,
        selectComponent,
        inputComponentV2,
        selectComponentV2
    },
    computed: {
        municipalityOption() {
            if (this.formData.province) {
                if (this.formData.province !== 'other') {
                    // Find Province Code
                    const province = provinceOption.find(data => data.province_name === this.formData.province)
                    // Set the Municipality
                    const municipalityList = municipality.filter(data => data.province_code === province.province_code)
                    this.isCustomProvince = false
                    return municipalityList
                }
                else {
                    this.isCustomProvince = true
                    return []
                }
            }
            return []
        },
        barangayOption() {
            if (this.formData.municipality) {
                if (this.formData.municipality !== 'other') {
                    // Find Municipality 
                    const city = municipality.find(data => data.city_name === this.formData.municipality)
                    // Set the Barangay 
                    const barangayList = barangay.filter(data => data.city_code == city.city_code)
                    this.isCustomMunicipality = false
                    return barangayList
                } else {
                    this.isCustomMunicipality = true
                    return []
                }
            }
            return []
        },
    },
    data() {
        const formData = new FormData()
        const weightOption = []
        for (let index = 100; index < 242; index++) {
            weightOption.push(index)
        }
        return {
            admissionApi: new ApplicantAdmissionApi(),
            noMiddleName: false,
            noExtensionName: false,
            isLoading: true,
            errors: [],
            educationalDetails: [],
            options,
            provinceOption,
            formData,
            customProvince: '',
            isCustomProvince: false,
            customMunicipality: '',
            isCustomMunicipality: false,
            customBarangay: '',
            isCustomBarangay: false
        }
    },
    mounted() {
        this.fetchInformation()
    },
    methods: {
        async fetchInformation() {
            const response = await this.admissionApi.fetchAdmissionInformation()
            const info = JSON.parse(response.json_details)
            this.formData = info
            this.formData.email = response.email
            this.formData.contact_number = response.contact_number
            this.formData.strand = response.strand
            if (response.applicant) {
                this.formData = response.applicant
                this.formData.email = response.email
                this.formData.contact_number = response.contact_number
                this.formData.strand = response.strand
            }
            console.log(response)
            this.isLoading = false
        },
        dateFormat(data) {
            const dateParts = data.split('-')
            const date = dateParts[0] + '-' + dateParts[1]
            return date
        },
        async storeDetails() {
            try {
                this.isLoading = true
                console.log(this.formData)
                await this.admissionApi.storeInformation(this.formData)
                    .then(response => {
                        console.log(response)
                        this.$router.push('/applicant/v2/dashboard')
                        //window.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.status === 422) {
                            this.errors = error.errors.data.errors
                            this.errorAlert({ message: 'Kindly Fill-up the Required Fields' })
                            return
                        }
                    }).finally(() => {
                        this.isLoading = false

                    })

            } catch (error) {
                console.log(error)
            }

        },
        optionChangeHandle() {
            this.isCustomBarangay = this.formData.barangay === 'other' ? true : false
        },
    }
}
</script>