<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0" data-iq-trigger="scroll"
        data-iq-ease="power.out" data-iq-opacity="0">
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
                            <input-component label="LAST NAME" v-model:value="lastName" :error="errors.last_name" />
                        </div>
                        <div class="col-xl col-md">
                            <input-component label="FIRST NAME" v-model:value="firstName" :error="errors.first_name" />
                        </div>
                        <div class="col-xl col-md">
                            <input-component label="middle name" v-model:value="middleName" :error="errors.middle_name"
                                :required="false" />
                        </div>
                        <div class="col-xl-2 col-md">
                            <input-component label="EXTENSION" v-model:value="extensionName" :error="errors.extension_name"
                                :required="false" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-md">
                            <select-component label="Gender" v-model:value="gender" :error="errors.gender"
                                :data="genderi" />
                        </div>

                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="HEIGHT - CM" v-model:value="height" :error="errors.height"
                                :data="heightList" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="WEIGHT - LBS" v-model:value="weight" :error="errors.weight"
                                :data="weightList" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-4 mb-xl-0">
                            <inputComponentV2 label="BIRTH DATE" type="date" v-model:value="birthDate"
                                :error="errors.birth_date" />
                        </div>
                        <div class="col-xl-9 col-md-8 mb-xl-0">
                            <input-component label="BIRTH PLACE" v-model:value="birthPlace" :error="errors.birthPlace" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-6 mb-xl-0">
                            <select-component label="Civil Status" v-model:value="civilStatus" :error="errors.civil_status"
                                :data="civilStatusList" />
                            <!-- <input-component label="CIVIL STATUS" v-model:value="civilStatus"
                                :error="errors.civil_status" /> -->
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="NATIONALITY" v-model:value="nationality" :error="errors.nationality" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="RELIGION" v-model:value="religion" :error="errors.religion" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="CONTACT NUMBER" v-model:value="contactNumber"
                                :error="errors.contact_number" />
                        </div>
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="EMAIL" v-model:value="personalEmail" :error="errors.personal_email" />

                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">ADDRESS</label>
                    <div class="row">
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="HOUSE NO. / STREET / BLDG NO" v-model:value="street"
                                :error="errors.street" />
                        </div>
                        <div class="col-xl-6 col-md-6 mb-xl-0">
                            <input-component label="BARANGAY" v-model:value="barangay" :error="errors.barangay" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="MUNICIPALITY" v-model:value="municipality"
                                :error="errors.municipality" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="PROVINCE" v-model:value="province" :error="errors.province" />
                        </div>
                        <div class="col-xl-4 col-md-6 mb-xl-0">
                            <input-component label="ZIP CODE" v-model:value="zip_code" :error="errors.zip_code" />
                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">EDUCATIONAL DETAILS</label>
                    <div v-if="educationaldetails" class="educational-details">
                        <div class="Elementary School">
                            <label for="" class="text-muted fw-bolder h6">Elementary School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name" v-model:value="elementarySchoolName"
                                        :error="errors.elementary_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address" v-model:value="elementarySchoolAddress"
                                        :error="errors.elementary_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="YEAR GRADUATED" type="month"
                                        v-model:value="elementarySchoolYear" :error="errors.elementary_school_year" />
                                </div>
                            </div>
                        </div>
                        <div class="Junior High School">
                            <label for="" class="text-muted fw-bolder h6">Junior High School</label>
                            <div class="row">
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school name" v-model:value="juniorHighSchoolName"
                                        :error="errors.junior_high_school_name" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component label="school address" v-model:value="juniorHighSchoolAddress"
                                        :error="errors.junior_high_school_address" />
                                </div>
                                <div class="col-xl-4 col-md-6 ">
                                    <input-component-v2 label="YEAR GRADUATED" type="month"
                                        v-model:value="juniorHighSchoolYear" :error="errors.junior_high_school_year" />
                                </div>
                            </div>
                        </div>
                        <div v-if="educationalAttainment.length > 3">
                            <div class="Junior High School">
                                <label for="" class="text-muted fw-bolder h6">Senior High School</label>
                                <div class="row">
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school name" v-model:value="seniorHighSchoolName"
                                            :error="errors.senior_high_school_name" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component label="school address" v-model:value="seniorHighSchoolAddress"
                                            :error="errors.senior_high_school_address" />
                                    </div>
                                    <div class="col-xl-4 col-md-6 ">
                                        <input-component-v2 label="YEAR GRADUATED" type="month"
                                            v-model:value="seniorHighSchoolYear" :error="errors.junior_high_school_year" />
                                    </div>
                                </div>
                            </div>
                            <select-component label="Senior High School Strand" v-model:value="strand"
                                :error="errors.strand" :data="strandList" />
                        </div>
                    </div>
                    <br>
                    <label for="" class="text-primary fw-bolder h4">PARENT DETAILS</label>
                    <div class="father-information">
                        <label for="example-text-input" class="form-control-label text-info"><b>Father's Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="LAST NAME" v-model:value="fatherLastName"
                                    :error="errors.father_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="fatherFirstName"
                                    :error="errors.father_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="fatherMiddleName"
                                    :error="errors.father_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="fatherContactNumber"
                                    :error="errors.father_contact_number" />
                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="fatherEducational"
                                    :error="errors.father_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="fatherEmployeeStatus"
                                    :error="errors.father_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="fatherArrangement"
                                    :error="errors.father_arrangment" :data="arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="mother-maiden">
                        <label for="example-text-input" class="form-control-label text-info"><b>Mother's Maiden Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="motherLastName"
                                    :error="errors.mother_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="motherFirstName"
                                    :error="errors.mother_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="motherMiddleName"
                                    :error="errors.mother_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="motherContactNumber"
                                    :error="errors.mother_contact_number" />

                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="motherEducational"
                                    :error="errors.mother_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="motherEmployeeStatus"
                                    :error="errors.mother_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="motherArrangement"
                                    :error="errors.mother_arrangment" :data="arrangement" />
                            </div>
                        </div>
                    </div>
                    <div class="guardian-informtion">
                        <label for="example-text-input" class="form-control-label text-info"><b>Guardian's Name</b></label>
                        <div class="row">
                            <div class="col-xl-4 col-md-6F">
                                <input-component label="LAST  NAME" v-model:value="guardianLastName"
                                    :error="errors.guardian_last_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="FIRST NAME" v-model:value="guardianFirstName"
                                    :error="errors.guardian_first_name" />
                            </div>
                            <div class="col-xl-4 col-md-6 ">
                                <input-component label="MIDDLE NAME" v-model:value="guardianMiddleName"
                                    :error="errors.guardian_middle_name" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-3 col-md-6 ">
                                <input-component label="CONTACT NUMBER" v-model:value="guardianContactNumber"
                                    :error="errors.guardian_contact_number" />

                            </div>
                            <div class="col-xl-9 col-md-6">
                                <select-component label="Highest Educational Attainment" v-model:value="guardianEducational"
                                    :error="errors.guardian_educational_attainment" :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="guardianEmployeeStatus"
                                    :error="errors.guardian_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="guardianArrangement"
                                    :error="errors.guardian_arrangment" :data="arrangement" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2 w-100">Submit Student Information</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { GET_USER_TOKEN, SHOW_LOADING_MUTATION } from '@/store/storeConstants'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'
import inputComponent from '@/components/main-layouts/components/widgets/input-component.vue'
import inputComponentV2 from '@/components/main-layouts/components/widgets/input-component-v2.vue'
import selectComponent from '@/components/main-layouts/components/widgets/select-component.vue'
import { SUCCESS_ALERT, INFO_ALERT, ERROR_ALERT, ENCRYPT_DATA } from '@/store/storeAlertConstants.js'
export default {
    name: 'EnrollmentRegistrationForm',
    components: {
        inputComponent,
        selectComponent,
        inputComponentV2
    },
    data() {
        const element = []
        for (let index = 100; index < 242; index++) {
            element.push(index)
        }
        const inputValidation = {
            isLoading: false,
            errors: [],
            educationaldetails: [],
            genderi: ['Male', 'Female'],
            civilStatusList: ['Single', 'Married', 'Widowed', 'Divorced'],
            educationalAttainment: ['Elementary Graduate', 'High School Graduate', 'College', 'Vocational', "Master's / Doctorate Degree", 'Did not attend school', 'N/a'],
            employmentStatus: ['Full Time', 'Part Time', 'Self-employed (i.e. Family Business)', 'Unemployed due to community quarantine', 'Field Work', 'None', 'N/a'],
            strandList: ['General Academic Strand', 'Humanities and Social Sciences Strand', 'Science, Technology, Engineering and Mathematics', ' Accountancy, Business and Management', 'Technical Vocational Livelihood', 'Pre-Baccalaureate Maritime Strand', 'N/a'],
            arrangement: ['WFH', 'Office', 'Field Work', 'None', 'N/a'],
            course: '',
            firstName: '',
            lastName: '',
            middleName: '',
            extensionName: '',
            gender: '',
            birthDate: '',
            birthPlace: '',
            height: '',
            weight: '',
            contactNumber: '',
            personalEmail: '',
            civilStatus: '',
            nationality: '',
            religion: '',
            street: '',
            barangay: '',
            municipality: '',
            province: '',
            zip_code: '',
            fatherLastName: '',
            fatherFirstName: '',
            fatherMiddleName: '',
            fatherContactNumber: '',
            fatherEducational: '',
            fatherEmployeeStatus: '',
            fatherArrangement: '',
            motherLastName: '',
            motherFirstName: '',
            motherMiddleName: '',
            motherContactNumber: '',
            motherEducational: '',
            motherEmployeeStatus: '',
            motherArrangement: '',
            guardianLastName: '',
            guardianFirstName: '',
            guardianMiddleName: '',
            guardianContactNumber: '',
            guardianEducational: '',
            guardianEmployeeStatus: '',
            guardianArrangement: '',
            elementarySchoolName: '',
            elementarySchoolAddress: '',
            elementarySchoolYear: '',
            juniorHighSchoolName: '',
            juniorHighSchoolAddress: '',
            juniorHighSchoolYear: '',
            seniorHighSchoolName: '',
            seniorHighSchoolAddress: '',
            seniorHighSchoolYear: '',
            strand: '',
            link: '',
            heightList: [
                '157.48', '160.02', '162.56', '165.1', '167.64', '170.18', '172.72', '175.26', '177.8', '180.34', '182.88', '185.42', '187.96', '190.5', '193.4', '195.58', '198.12', '200.66', '203.2', '205.74', '208.28', '210.82'
            ],
            weightList: element
        }
        return inputValidation
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    mounted() {
        axios.get('applicant/information', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            const account = response.data.data
            const data = response.data.data.applicant
            if (!data) {
                const accountDetails = JSON.parse(account.json_details)
                this.firstName = accountDetails.first_name
                this.lastName = accountDetails.last_name
                this.birthDate = accountDetails.birthday
            }
            this.contactNumber = account.contact_number
            this.personalEmail = account.email
            this.strand = account.strand
            if (data) {
                this.firstName = data.first_name
                this.lastName = data.last_name
                this.middleName = data.middle_name
                this.middleInitial = data.middle_initial
                this.extensionName = data.extention_name
                this.birthDate = data.birthday
                this.birthPlace = data.birth_place
                this.gender = data.sex
                this.weight = data.weight
                this.height = data.height
                this.civilStatus = data.civil_status
                this.nationality = data.nationality
                this.religion = data.religion
                this.street = data.street
                this.barangay = data.barangay
                this.municipality = data.municipality
                this.province = data.province
                this.zip_code = data.zip_code.toString()
                /* Father */
                this.fatherLastName = data.father_last_name
                this.fatherFirstName = data.father_first_name
                this.fatherMiddleName = data.father_middle_name
                this.fatherContactNumber = data.father_contact_number
                this.fatherEducational = data.father_educational_attainment
                this.fatherEmployeeStatus = data.father_employment_status
                this.fatherArrangement = data.father_working_arrangement
                /* Mother Maiden */
                this.motherLastName = data.mother_last_name
                this.motherFirstName = data.mother_first_name
                this.motherMiddleName = data.mother_middle_name
                this.motherContactNumber = data.mother_contact_number
                this.motherEducational = data.mother_educational_attainment
                this.motherEmployeeStatus = data.mother_employment_status
                this.motherArrangement = data.mother_working_arrangement
                /* Guardian */
                this.guardianLastName = data.guardian_last_name
                this.guardianFirstName = data.guardian_first_name
                this.guardianMiddleName = data.guardian_middle_name
                this.guardianContactNumber = data.guardian_contact_number
                this.guardianEducational = data.guardian_educational_attainment
                this.guardianEmployeeStatus = data.guardian_employment_status
                this.guardianArrangement = data.guardian_working_arrangement
                this.guardianAddress = data.guardian_address
                /* Education */
                this.elementarySchoolName = data.elementary_school_name
                this.elementarySchoolAddress = data.elementary_school_address
                this.elementarySchoolYear = this.dateFormat(data.elementary_school_year)
                this.juniorHighSchoolName = data.junior_high_school_name
                this.juniorHighSchoolAddress = data.junior_high_school_address
                this.juniorHighSchoolYear = this.dateFormat(data.junior_high_school_year)
                this.seniorHighSchoolName = data.senior_high_school_name
                this.seniorHighSchoolAddress = data.senior_high_school_address
                this.seniorHighSchoolYear = this.dateFormat(data.senior_high_school_year)
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            console.log(error.response)
        })
    },
    methods: {
        ...mapActions('alert', {
            successAlert: SUCCESS_ALERT,
            infoAlert: INFO_ALERT,
            errorAlert: ERROR_ALERT,
            encrypt: ENCRYPT_DATA
        }),
        ...mapMutations({
            showLoading: SHOW_LOADING_MUTATION
        }),
        dateFormat(data) {
            const dateParts = data.split('-')
            const date = dateParts[0] + '-' + dateParts[1]
            return date
        },
        async storeDetails() {
            this.errors = []
            this.showLoading(true)
            const formData = {
                course: this.course,
                first_name: this.firstName,
                last_name: this.lastName,
                middle_name: this.middleName,
                extension_name: this.extensionName,
                gender: this.gender,
                height: this.height,
                weight: this.weight,
                birth_date: this.birthDate,
                birth_place: this.birthPlace,
                civil_status: this.civilStatus,
                nationality: this.nationality,
                religion: this.religion,
                street: this.street,
                barangay: this.barangay,
                municipality: this.municipality,
                province: this.province,
                zip_code: this.zip_code,
                personal_email: this.personalEmail,
                contact_number: this.contactNumber,
                /* Parents */
                father_last_name: this.fatherLastName,
                father_first_name: this.fatherFirstName,
                father_middle_name: this.fatherMiddleName,
                father_contact_number: this.fatherContactNumber,
                father_educational_attainment: this.fatherEducational,
                father_employment_status: this.fatherEmployeeStatus,
                father_working_arrangement: this.fatherArrangement,
                mother_last_name: this.motherLastName,
                mother_first_name: this.motherFirstName,
                mother_middle_name: this.motherMiddleName,
                mother_contact_number: this.motherContactNumber,
                mother_educational_attainment: this.motherEducational,
                mother_employment_status: this.motherEmployeeStatus,
                mother_working_arrangement: this.motherArrangement,
                guardian_last_name: this.guardianLastName,
                guardian_first_name: this.guardianFirstName,
                guardian_middle_name: this.guardianMiddleName,
                guardian_contact_number: this.guardianContactNumber,
                guardian_educational_attainment: this.guardianEducational,
                guardian_employment_status: this.guardianEmployeeStatus,
                guardian_working_arrangement: this.guardianArrangement,
                /* Educational Background */
                elementary_school_name: this.elementarySchoolName,
                elementary_school_address: this.elementarySchoolAddress,
                elementary_school_year: this.elementarySchoolYear + '-01',
                junior_high_school_name: this.juniorHighSchoolName,
                junior_high_school_address: this.juniorHighSchoolAddress,
                junior_high_school_year: this.juniorHighSchoolYear + '-01',
                senior_high_school_name: this.seniorHighSchoolName,
                senior_high_school_address: this.seniorHighSchoolAddress,
                senior_high_school_year: this.seniorHighSchoolYear + '-01',
                strand: this.strand
            }
            axios.post('applicant/information', formData, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                this.$router.push('/applicant/dashboard')
                console.log(response)
            }).catch((error) => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    error = { message: 'Kindly Fill-up the Required Fields' }
                }
                this.showLoading(false)
                this.errorAlert(error)
            })
        }
    }
}
</script>