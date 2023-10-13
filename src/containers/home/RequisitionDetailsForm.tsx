import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

const RequisitionDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
    isValid,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      handleTab(1);
    }
  });

  const{useData} = require('./DataProvider');
  const {state, setState} = useData();

  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>, n:number): void =>{
    // alert("Changed")
    setState({
      requisitionDetails: {
        gender: state.requisitionDetails.gender,
        noOfOpenings: n==2?e.target.value:state.requisitionDetails.noOfOpenings,
        requisitionTitle: n==1?e.target.value:state.requisitionDetails.requisitionTitle,
        urgency: state.requisitionDetails.urgency,
      },
      jobDetails: {
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
        jobTitle: state.jobDetails.jobTitle,
      },
      interviewSettings: {
        interviewDuration: state.interviewSettings.interviewDuration,
        interviewLanguage: state.interviewSettings.interviewLanguage,
        interviewMode: state.interviewSettings.interviewMode,
      },
    });
    handleChange(e);
  }

  const customSetFieldValue = (name:string, value:String, n:number): void =>{
    console.log(value)
    setState({
      requisitionDetails: {
        gender: n==3?value:state.requisitionDetails.gender,
        noOfOpenings: state.requisitionDetails.noOfOpenings,
        requisitionTitle: state.requisitionDetails.requisitionTitle,
        urgency: n==4?value:state.requisitionDetails.urgency,
      },
      jobDetails: {
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
        jobTitle: state.jobDetails.jobTitle,
      },
      interviewSettings: {
        interviewDuration: state.interviewSettings.interviewDuration,
        interviewLanguage: state.interviewSettings.interviewLanguage,
        interviewMode: state.interviewSettings.interviewMode,
      },
    });
    setFieldValue(name,value);
  }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={(e)=>customHandleChange(e,1)}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={(e)=>customHandleChange(e,2)}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={(name:string,value:String)=>{customSetFieldValue(name,value,3)}}
          onBlur={setFieldTouched}
          error={errors.gender}
          touched={touched.gender}
          value={values.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={(name:string,value:String)=>{customSetFieldValue(name,value,4)}}
          onBlur={setFieldTouched}
          error={errors.urgency}
          touched={touched.urgency}
          value={values.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
