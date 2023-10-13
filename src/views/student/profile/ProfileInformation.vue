<template>
    <div class="card shadow">
        <div class="card-header">
            <div class="header-title">
                <label for="" class="fw-bolder text-primary h4">STUDENT INFORMATION</label>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-xl col-md">
                    <labelComponents label="LAST NAME" :value="details.account.last_name" />
                </div>
                <div class="col-xl col-md">
                    <labelComponents label="first name" :value="details.account.first_name" />
                </div>
                <div class="col-xl col-md">
                    <labelComponents label="middle NAME" :value="details.account.middle_name" />
                </div>
                <div class="col-xl col-md">
                    <labelComponents label="middle initial" :value="details.account.middle_initial" />
                </div>
                <div class="col-xl col-md">
                    <labelComponents label="extension name" :value="details.account.extention_name" />
                </div>
            </div>
            <div class="row">
                <div class="col-xl-4 col-md">
                    <labelComponents label="Gender" :value="details.account.sex" />
                </div>
                <div class="col-xl col-md-6 mb-xl-0">
                    <labelComponents label="HEIGHT - CM" :value="details.account.height" />
                </div>
                <div class="col-xl col-md-6 mb-xl-0">
                    <labelComponents label="WEIGHT - LBS" :value="details.account.weight" />
                </div>
            </div>
            <div class="row">
                <div class="col-xl col-md-4 mb-xl-0">
                    <labelComponents label="birthday" :value="details.account.birthday" />
                </div>
                <div class="col-xl-9 col-md-8 mb-xl-0">
                    <labelComponents label="BIRTH PLACE" :value="details.account.birth_place" />
                </div>
            </div>
            <div class="row">
                <div class="col-xl col-md-6 mb-xl-0">
                    <labelComponents label="CIVIL STATUS" :value="details.account.civil_status" />
                </div>
                <div class="col-xl col-md-6 mb-xl-0">
                    <labelComponents label="NATIONALITY" :value="details.account.nationality" />
                </div>
                <div class="col-xl col-md-6 mb-xl-0">
                    <labelComponents label="RELIGION" :value="details.account.religion" />
                </div>
            </div>
            <div class="row">
                <div class="col-xl-6 col-md-6 mb-xl-0">
                    <labelComponents label="CONTACT NUMBER" :value="details.account.contact_number" />
                </div>
                <div class="col-xl-6 col-md-6 mb-xl-0">
                    <labelComponents label="EMAIL" :value="details.account.account.personal_email" />

                </div>
            </div>
            <br>
            <label for="" class="text-primary fw-bolder h4">ADDRESS</label>
            <div class="row">
                <div class="col-xl-6 col-md-6 mb-xl-0">
                    <labelComponents label="HOUSE NO. / STREET / BLDG NO" :value="details.account.street" />
                </div>
                <div class="col-xl-6 col-md-6 mb-xl-0">
                    <labelComponents label="BARANGAY" :value="details.account.barangay" />
                </div>
                <div class="col-xl-4 col-md-6 mb-xl-0">
                    <labelComponents label="MUNICIPALITY" :value="details.account.municipality" />
                </div>
                <div class="col-xl-4 col-md-6 mb-xl-0">
                    <labelComponents label="PROVINCE" :value="details.account.province" />
                </div>
                <div class="col-xl-4 col-md-6 mb-xl-0">
                    <labelComponents label="ZIP CODE" :value="details.account.zip_code" />
                </div>
            </div>
            <br>
            <label for="" class="text-primary fw-bolder h4">PARENT DETAILS</label>
            <div class="father-information">
                <label for="example-text-input" class="form-control-label text-info">
                    <b>Father's Information</b>
                </label>
                <div class="row">
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="LAST NAME" :value="details.account.parent_details.father_last_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="FIRST NAME" :value="details.account.parent_details.father_first_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="MIDDLE NAME" :value="details.account.parent_details.father_middle_name" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-md-6 ">
                        <labelComponents label="CONTACT NUMBER"
                            :value="details.account.parent_details.father_contact_number" />
                    </div>
                    <div class="col-xl-9 col-md-6">
                        <labelComponents label="Highest Educational Attainment"
                            :value="details.account.parent_details.father_educational_attainment" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Employment Status"
                            :value="details.account.parent_details.father_employment_status" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Working Arrangement"
                            :value="details.account.parent_details.father_working_arrangement" />
                    </div>
                </div>
            </div>
            <div class="mother-maiden">
                <label for="example-text-input" class="form-control-label text-info"><b>Mother Maiden's
                        Information</b></label>
                <div class="row">
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="LAST NAME" :value="details.account.parent_details.mother_last_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="FIRST NAME" :value="details.account.parent_details.mother_first_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="MIDDLE NAME" :value="details.account.parent_details.mother_middle_name" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-md-6 ">
                        <labelComponents label="CONTACT NUMBER"
                            :value="details.account.parent_details.mother_contact_number" />
                    </div>
                    <div class="col-xl-9 col-md-6">
                        <labelComponents label="Highest Educational Attainment"
                            :value="details.account.parent_details.mother_educational_attainment" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Employment Status"
                            :value="details.account.parent_details.mother_employment_status" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Working Arrangement"
                            :value="details.account.parent_details.mother_working_arrangement" />
                    </div>
                </div>
            </div>
            <div class="guardian-informtion">
                <label for="example-text-input" class="form-control-label text-info">
                    <b>Guardian Information</b>
                </label>
                <div class="row">
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="LAST NAME" :value="details.account.parent_details.guardian_last_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="FIRST NAME" :value="details.account.parent_details.guardian_first_name" />
                    </div>
                    <div class="col-xl-4 col-md-6 ">
                        <labelComponents label="MIDDLE NAME" :value="details.account.parent_details.guardian_middle_name" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-3 col-md-6 ">
                        <labelComponents label="CONTACT NUMBER"
                            :value="details.account.parent_details.guardian_contact_number" />
                    </div>
                    <div class="col-xl-9 col-md-6">
                        <labelComponents label="Highest Educational Attainment"
                            :value="details.account.parent_details.guardian_educational_attainment" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Employment Status"
                            :value="details.account.parent_details.guardian_employment_status" />
                    </div>
                    <div class="col-md">
                        <labelComponents label="Working Arrangement"
                            :value="details.account.parent_details.guardian_working_arrangement" />
                    </div>
                    <div class="col-xl-12 col-md-12">
                        <labelComponents label="Guardian Address"
                            :value="details.account.parent_details.guardian_address" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import labelComponents from '@/components/main-layouts/components/widgets/label-component.vue'
export default {
    name: 'Profile Information',
    components: {
        labelComponents
    },
    methods: {
        displayName(data) {
            const extensionName = data.extention_name.toUpperCase() !== 'N/A' ? ' ' + data.extention_name : ''
            const fullName = data.last_name + extensionName + ', ' + data.first_name + ' ' + data.middle_initial
            return fullName.toUpperCase()
        }
    },
    props: {
        details: Object
    }
}
</script>