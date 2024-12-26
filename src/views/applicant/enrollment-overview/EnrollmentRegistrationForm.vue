<template>
    <div class="card ms-5 me-5" data-iq-gsap="onStart" data-iq-position-y="70" data-iq-rotate="0"
        data-iq-trigger="scroll" data-iq-ease="power.out" data-iq-opacity="0">
        <div class="card-header p-3">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT'S INFORMATION</label>
                <br>
                <small for="" class="text-danger">
                    NOTE: Double check - Please ensure that all information/details are correct and filled in,
                    type/choose N / A if not applicable
                </small>
            </div>
        </div>
        <div class="card-body">
            <div v-if="isLoading">
                <h2 class="fw-bolder text-info">LOADING</h2>
            </div>
            <div v-else>
                <form @submit.prevent="updateDetails" method="post">
                    <label for="" class="text-primary fw-bolder h4">STUDENT'S DETAILS</label>
                    <div class="row">
                        <div class="col-xl col-md">
                            <input-component label="LAST NAME" v-model:value="lastName" :error="errors.last_name" />
                        </div>
                        <div class="col-xl col-md">
                            <input-component label="FIRST NAME" v-model:value="firstName" :error="errors.first_name" />
                        </div>
                        <div class="col-xl col-md">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>MIDDLE NAME</small>
                                </label>
                                <input class="form-control form-control-sm border border-primary" v-model="middleName">
                                <div class="form-check">
                                    <input class="form-check-input input-middle-name" type="checkbox" value="n/a"
                                        v-model="middleName" id="flexCheckDefault1">
                                    <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                        for="flexCheckDefault1">
                                        I don't have a Middle name
                                    </small>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.middle_name">{{ errors.middle_name[0]
                                    }}</span>

                            </div>
                        </div>
                        <div class="col-xl-2 col-md">
                            <input-component label="MIDDLE INITIAL" v-model:value="middleInitial"
                                :error="errors.middle_initial" :required="false" />
                        </div>
                        <div class="col-xl-2 col-md">
                            <input-component label="EXTENSION" v-model:value="extensionName"
                                :error="errors.extension_name" :required="false" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4 col-md">
                            <select-component label="Gender" v-model:value="gender" :error="errors.gender"
                                :data="genderi" />
                        </div>

                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="HEIGHT - CM" v-model:value="height" :error="errors.height" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="WEIGHT - LBS" v-model:value="weight" :error="errors.weight" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-4 mb-xl-0">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>BIRTH DATE <span class="text-danger">*</span></small>
                                </label>
                                <input class="form-control form-control-sm border border-primary" type="date"
                                    v-model="birthDate">
                                <span class="badge bg-danger mt-2" v-if="errors.birth_date">{{ errors.birth_date[0]
                                    }}</span>
                            </div>
                        </div>
                        <div class="col-xl-9 col-md-8 mb-xl-0">
                            <input-component label="BIRTH PLACE" v-model:value="birthPlace"
                                :error="errors.birthPlace" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="CIVIL STATUS" v-model:value="civilStatus"
                                :error="errors.civil_status" />
                        </div>
                        <div class="col-xl col-md-6 mb-xl-0">
                            <input-component label="NATIONALITY" v-model:value="nationality"
                                :error="errors.nationality" />
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
                            <input-component label="EMAIL" v-model:value="personalEmail"
                                :error="errors.personal_email" />

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
                                            v-model:value="seniorHighSchoolYear"
                                            :error="errors.junior_high_school_year" />
                                    </div>
                                </div>
                            </div>
                            <select-component label="Senior High School Strand" v-model:value="strand"
                                :error="errors.strand" :data="strandList" />
                        </div>
                    </div>
                    <br>
                    <label for="" class="text-primary fw-bolder h4">PARENT'S DETAILS</label>
                    <div class="father-information">
                        <label for="example-text-input" class="form-control-label text-info"><b>Father's
                                Information</b></label>
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
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="fatherEducational" :error="errors.father_educational_attainment"
                                    :data="educationalAttainment" />
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
                        <label for="example-text-input" class="form-control-label text-info"><b>Mother Maiden's
                                Information</b></label>
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
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="motherEducational" :error="errors.mother_educational_attainment"
                                    :data="educationalAttainment" />
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
                        <label for="example-text-input" class="form-control-label text-info"><b>Guardian
                                Information</b></label>
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
                                <select-component label="Highest Educational Attainment"
                                    v-model:value="guardianEducational" :error="errors.guardian_educational_attainment"
                                    :data="educationalAttainment" />
                            </div>
                            <div class="col-md">
                                <select-component label="Employment Status" v-model:value="guardianEmployeeStatus"
                                    :error="errors.guardian_employee_status" :data="employmentStatus" />
                            </div>
                            <div class="col-md">
                                <select-component label="Working Arrangement" v-model:value="guardianArrangement"
                                    :error="errors.guardian_arrangment" :data="arrangement" />
                            </div>
                            <div class="col-xl-12 col-md-12 ">
                                <input-component label="Guardian Address" v-model:value="guardianAddress"
                                    :error="errors.guardian_address" />

                                <div class="form-check mt-0 mb-2">
                                    <input class="form-check-input input-middle-name" type="checkbox" value="n/a"
                                        v-model="checkBoxAddress" id="flexCheckDefault1" @click="sameAddress()">
                                    <small class="form-check-label validate-checkbox" data-input="input-middle-name"
                                        for="flexCheckDefault1">
                                        Same as my address
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <label for="" class="text-primary fw-bolder h4">OTHER DETAILS</label>
                    <div class="additional">
                        <div class="row">
                            <div class="col-xl-4 col-md-12">
                                <select-component label="HOUSEHOLD INCOME" v-model:value="householdIncome"
                                    :error="errors.household_income" :data="incomeList" />
                            </div>
                            <div class="col-xl-8 col-md-12">
                                <select-component label="Is your family Beneficiary of DSWD Listahan / 4P's ? "
                                    v-model:value="beneficiary" :error="errors.dswd_beneficiary"
                                    :data="beneficiaryList" />
                            </div>
                            <div class="col-xl-6 col-md-12">
                                <select-component label="HOMEOWNERSHIP" v-model:value="homeOwnership"
                                    :error="errors.home_ownership" :data="homeOwnershipList" />
                            </div>
                            <div class="col-xl-6 col-md-12">
                                <select-component label="CAR OWNERSHIP" v-model:value="carOwnership"
                                    :error="errors.car_ownership" :data="carOwnershipList" />
                            </div>
                        </div>
                    </div>
                    <div class="additional-info">
                        <label for="example-text-input" class="form-control-label text-info fw-bolder">
                            ACCESS TO DISTANCE LEARNING
                        </label>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What devices are available at home that the student can use for
                                        learning?<span class="text-danger">*</span> <small class="text-warning"> Check
                                            all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index) in deviceList" :key="index" class="form-check col-md-4">
                                        <input class="form-check-input" type="checkbox" v-model="deviceSelected"
                                            :id="`check_box_device_` + index" :value="item">
                                        <label class="form-check-label" :for="`check_box_device_` + index">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.available_device">{{
                errors.available_device[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <select-component label="Do you have a way to connect to the internet? "
                                v-model:value="internetConnection" :error="errors.available_connection"
                                :data="beneficiaryList" />
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>How do you connect to the Internet?<span class="text-danger">*</span> <small
                                            class="text-warning"> Check all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index1) in providerList" :key="index1"
                                        class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox"
                                            :id="`check_box_provider_` + index1" :value="item"
                                            v-model="providerAvailable">
                                        <label class="form-check-label" :for="`check_box_provider_` + index1">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.available_provider">{{
                errors.available_provider[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What Learning Modality do you prefer?<span class="text-danger">*</span>
                                        <small class="text-warning"> Check all that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index2) in learningModalityList" :key="index2"
                                        class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox"
                                            :id="`check_box_modality_` + index2" :value="item"
                                            v-model="learningModality">
                                        <label class="form-check-label" :for="`check_box_modality_` + index2">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.learning_modality">{{
                errors.learning_modality[0] }}</span>
                            </div>
                        </div>
                        <div class="col-xl-12 col-md-12">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label fw-bolder">
                                    <small>What are the challenges that may affect your learning process through
                                        distance
                                        education?<span class="text-danger">*</span> <small class="text-warning"> Check
                                            all
                                            that
                                            applies</small></small>
                                </label>
                                <div class="row me-3 ms-3">
                                    <div v-for="(item, index3) in inputsList" :key="index3"
                                        class="form-check col-md-12">
                                        <input class="form-check-input" type="checkbox"
                                            :id="`check_box_learning_` + index3" :value="item"
                                            v-model="distanceLearning">
                                        <label class="form-check-label" :for="`check_box_learning_` + index3">
                                            {{ item }}
                                        </label>
                                    </div>
                                </div>
                                <span class="badge bg-danger mt-2" v-if="errors.distance_learning_effect">{{
                                    errors.distance_learning_effect[0] }}</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2 w-100">Submit</button>
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
import * as phpSerialize from 'php-serialize'
export default {
    name: 'EnrollmentRegistrationForm',
    components: {
        inputComponent,
        selectComponent,
        inputComponentV2
    },
    data() {
        const inputValidation = {
            isLoading: true,
            checkBoxAddress: '',
            errors: [],
            educationaldetails: [],
            genderi: ['Male', 'Female'],
            educationalAttainment: ['Elementary Graduate', 'High School Graduate', 'College', 'Vocational', "Master's / Doctorate Degree", 'Did not attend school', 'N/a'],
            employmentStatus: ['Full Time', 'Part Time', 'Self-employed (i.e. Family Business)', 'Unemployed due to community quarantine', 'Field Work', 'None', 'N/a'],
            arrangement: ['WFH', 'Office', 'Field Work', 'None', 'N/a'],
            incomeList: ['Below 10,000', '10,000-20,000', '20,000-40,000', '40,000-60,000', '60,000 Above', 'N/a'],
            beneficiaryList: ['Yes', 'No'],
            homeOwnershipList: ['Owned', 'Mortgaged', 'Rented'],
            carOwnershipList: ['0', '1', '2', '3', 'up to 4'],
            deviceList: ['Cable TV', 'Non-Cable TV', 'Basic Cellphone', 'Smartphone', 'Tablet', 'Radio', 'Desktop Computer', 'Laptop', 'None'],
            providerList: ['own mobile data', 'own broadband (DSL, Wireless Fiber, Satellite)', 'computer shop', 'other places outside the home with internet connection (library, barangay, neighbor, relatives)', 'none'],
            learningModalityList: ['online learning', 'Blended', 'Face-to-Face'],
            inputsList: ['lack of available gadgets / equipment', 'insufficient load/data allowance', 'existing health condition/s', 'difficulty in independent learning', 'conflict with other activities (i.e. house chores)', 'none or lack of available space for studying', 'distractions (i.e. social media, noise from community/ neighbor)', 'none'],
            strandList: ['General Academic Strand', 'Humanities and Social Sciences Strand', 'Science, Technology, Engineering and Mathematics', ' Accountancy, Business and Management', 'Technical Vocational Livelihood', 'Pre-Baccalaureate Maritime Strand'],
            course: '',
            firstName: '',
            lastName: '',
            middleName: 'N/A',
            middleInitial: 'N/A',
            extensionName: 'N/A',
            gender: '',
            birthDate: '',
            birthPlace: '',
            hieght: '',
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
            guardianAddress: '',
            elementarySchoolName: '',
            elementarySchoolAddress: '',
            elementarySchoolYear: '',
            juniorHighSchoolName: '',
            juniorHighSchoolAddress: '',
            juniorHighSchoolYear: '',
            seniorHighSchoolName: '',
            seniorHighSchoolAddress: '',
            seniorHighSchoolYear: '',
            householdIncome: '',
            beneficiary: '',
            homeOwnership: '',
            carOwnership: '',
            deviceSelected: [],
            internetConnection: '',
            providerAvailable: [],
            distanceLearning: [],
            learningModality: [],
            link: '',
            strand: ''
        }
        return inputValidation
    },
    computed: {
        ...mapGetters('auth', {
            token: GET_USER_TOKEN
        })
    },
    mounted() {
        this.link = 'applicant/enrollment-registration'
        axios.get('applicant/enrollment-registration', {
            headers: {
                Authorization: 'Bearer ' + this.token
            }
        }).then((response) => {
            const studentDetails = response.data.student
            const account = response.data.user
            console.log(response.data)
            if (response.data.student_v2 !== null) {
                this.retriveStudentDetails(account, response.data.student_v2)
            } else {
                this.retriveApplicantDetails(account, studentDetails)
            }
            this.isLoading = false
        }).catch((error) => {
            console.log(error)
            this.errorAlert(error)
            this.isLoading = false
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
        async updateDetails() {
            this.errors = []
            this.showLoading(true)
            const formData = {
                course: this.course,
                first_name: this.firstName,
                last_name: this.lastName,
                middle_name: this.middleName,
                middle_initial: this.middleInitial,
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
                guardian_address: this.guardianAddress,
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
                strand: this.strand,
                /* additional information */
                household_income: this.householdIncome,
                dswd_beneficiary: this.beneficiary,
                home_ownership: this.homeOwnership,
                car_ownership: this.carOwnership,
                available_device: this.deviceSelected,
                available_connection: this.internetConnection,
                available_provider: this.providerAvailable,
                learning_modality: this.learningModality,
                distance_learning_effect: this.distanceLearning

            }
            axios.post(this.link, formData, {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }).then((response) => {
                this.showLoading(false)
                this.successAlert(response.data)
                this.$router.push('/applicant/enrollment-overview')
                console.log(response)
            }).catch((error) => {
                this.errors = error
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    error = { message: 'Kindly Fill-up the Required Fields' }
                }
                this.showLoading(false)
                this.errorAlert(error)
            })
        },
        retriveStudentDetails(account, studentDetails) {
            this.firstName = studentDetails.first_name
            this.lastName = studentDetails.last_name
            this.middleName = studentDetails.middle_name
            this.middleInitial = studentDetails.middle_initial
            this.extensionName = studentDetails.extention_name
            this.birthDate = studentDetails.birthday
            this.birthPlace = studentDetails.birth_place
            this.gender = studentDetails.sex
            this.weight = studentDetails.weight
            this.height = studentDetails.height
            this.personalEmail = account.email
            this.civilStatus = studentDetails.civil_status
            this.nationality = studentDetails.nationality
            this.religion = studentDetails.religion
            this.street = studentDetails.street
            this.barangay = studentDetails.barangay
            this.municipality = studentDetails.municipality
            this.province = studentDetails.province
            this.zip_code = studentDetails.zip_code.toString()
            this.contactNumber = account.contact_number
            if (studentDetails.parent_details) {
                const parents = studentDetails.parent_details
                /* Father */
                this.fatherLastName = parents.father_last_name
                this.fatherFirstName = parents.father_first_name
                this.fatherMiddleName = parents.father_middle_name
                this.fatherContactNumber = parents.father_contact_number
                this.fatherEducational = parents.father_educational_attainment
                this.fatherEmployeeStatus = parents.father_employment_status
                this.fatherArrangement = parents.father_working_arrangement
                /* Mother Maiden */
                this.motherLastName = parents.mother_last_name
                this.motherFirstName = parents.mother_first_name
                this.motherMiddleName = parents.mother_middle_name
                this.motherContactNumber = parents.mother_contact_number
                this.motherEducational = parents.mother_educational_attainment
                this.motherEmployeeStatus = parents.mother_employment_status
                this.motherArrangement = parents.mother_working_arrangement
                // Guardian
                this.guardianLastName = parents.guardian_last_name
                this.guardianFirstName = parents.guardian_first_name
                this.guardianMiddleName = parents.guardian_middle_name
                this.guardianContactNumber = parents.guardian_contact_number
                this.guardianEducational = parents.guardian_educational_attainment
                this.guardianEmployeeStatus = parents.guardian_employment_status
                this.guardianArrangement = parents.guardian_working_arrangement
                this.guardianAddress = parents.guardian_address
                this.householdIncome = parents.household_income
                this.beneficiary = parents.dswd_listahan
                this.homeOwnership = parents.homeownership
                this.carOwnership = parents.car_ownership
                this.internetConnection = parents.available_connection
            }
            studentDetails.educational_background.forEach(element => {
                switch (element.school_level) {
                    case 'Elementary School':
                        this.elementarySchoolName = element.school_name
                        this.elementarySchoolAddress = element.school_address
                        this.elementarySchoolYear = this.dateFormat(element.graduated_year)
                        break
                    case 'Junior High School':
                        this.juniorHighSchoolName = element.school_name
                        this.juniorHighSchoolAddress = element.school_address
                        this.juniorHighSchoolYear = this.dateFormat(element.graduated_year)
                        break
                    case 'Senior High School':
                        this.seniorHighSchoolName = element.school_name
                        this.seniorHighSchoolAddress = element.school_address
                        this.seniorHighSchoolYear = this.dateFormat(element.graduated_year)
                        break
                    default:
                        break
                }
            })
            // Education
            /*  this.elementarySchoolName = studentDetails.elementary_school_name
             this.elementarySchoolAddress = studentDetails.elementary_school_address
             this.elementarySchoolYear = this.dateFormat(studentDetails.elementary_school_year)
             this.juniorHighSchoolName = studentDetails.junior_high_school_name
             this.juniorHighSchoolAddress = studentDetails.junior_high_school_address
             this.juniorHighSchoolYear = this.dateFormat(studentDetails.junior_high_school_year)
             this.seniorHighSchoolName = studentDetails.senior_high_school_name
             this.seniorHighSchoolAddress = studentDetails.senior_high_school_address
             this.seniorHighSchoolYear = this.dateFormat(studentDetails.senior_high_school_year) */
        },
        retriveApplicantDetails(account, studentDetails) {
            this.firstName = studentDetails.first_name
            this.lastName = studentDetails.last_name
            this.middleName = studentDetails.middle_name
            this.middleInitial = studentDetails.middle_initial
            this.extensionName = studentDetails.extention_name
            this.birthDate = studentDetails.birthday
            this.birthPlace = studentDetails.birth_place
            this.gender = studentDetails.sex
            this.weight = studentDetails.weight
            this.height = studentDetails.height
            this.personalEmail = account.email
            this.civilStatus = studentDetails.civil_status
            this.nationality = studentDetails.nationality
            this.religion = studentDetails.religion
            this.street = studentDetails.street
            this.barangay = studentDetails.barangay
            this.municipality = studentDetails.municipality
            this.province = studentDetails.province
            this.zip_code = studentDetails.zip_code.toString()
            this.contactNumber = account.contact_number
            /* Father */
            this.fatherLastName = studentDetails.father_last_name
            this.fatherFirstName = studentDetails.father_first_name
            this.fatherMiddleName = studentDetails.father_middle_name
            this.fatherContactNumber = studentDetails.father_contact_number
            this.fatherEducational = studentDetails.father_educational_attainment
            this.fatherEmployeeStatus = studentDetails.father_employment_status
            this.fatherArrangement = studentDetails.father_working_arrangement
            /* Mother Maiden */
            this.motherLastName = studentDetails.mother_last_name
            this.motherFirstName = studentDetails.mother_first_name
            this.motherMiddleName = studentDetails.mother_middle_name
            this.motherContactNumber = studentDetails.mother_contact_number
            this.motherEducational = studentDetails.mother_educational_attainment
            this.motherEmployeeStatus = studentDetails.mother_employment_status
            this.motherArrangement = studentDetails.mother_working_arrangement
            // Guardian
            this.guardianLastName = studentDetails.guardian_last_name
            this.guardianFirstName = studentDetails.guardian_first_name
            this.guardianMiddleName = studentDetails.guardian_middle_name
            this.guardianContactNumber = studentDetails.guardian_contact_number
            this.guardianEducational = studentDetails.guardian_educational_attainment
            this.guardianEmployeeStatus = studentDetails.guardian_employment_status
            this.guardianArrangement = studentDetails.guardian_working_arrangement
            this.guardianAddress = studentDetails.guardian_address
            // Education
            this.elementarySchoolName = studentDetails.elementary_school_name
            this.elementarySchoolAddress = studentDetails.elementary_school_address
            this.elementarySchoolYear = this.dateFormat(studentDetails.elementary_school_year)
            this.juniorHighSchoolName = studentDetails.junior_high_school_name
            this.juniorHighSchoolAddress = studentDetails.junior_high_school_address
            this.juniorHighSchoolYear = this.dateFormat(studentDetails.junior_high_school_year)
            this.seniorHighSchoolName = studentDetails.senior_high_school_name
            this.seniorHighSchoolAddress = studentDetails.senior_high_school_address
            this.seniorHighSchoolYear = this.dateFormat(studentDetails.senior_high_school_year)
        },
        convertDataSerialize(data) {
            console.log('Converting Data: ' + phpSerialize.unserialize(data))
            return phpSerialize.unserialize(data)
        },
        sameAddress() {
            this.guardianAddress = this.street + ' ' + this.barangay + ' ' + this.municipality
        }
    }

}
</script>