import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  const{useData} = require('./DataProvider');
  const {state, setState} = useData();

  const customSetFieldValue = (name:string, value:String, n:number): void =>{
    console.log(value)
    setState({
      requisitionDetails: {
        gender: state.requisitionDetails.gender,
        noOfOpenings: state.requisitionDetails.noOfOpenings,
        requisitionTitle: state.requisitionDetails.requisitionTitle,
        urgency: state.requisitionDetails.urgency,
      },
      jobDetails: {
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
        jobTitle: state.jobDetails.jobTitle,
      },
      interviewSettings: {
        interviewDuration: n==9?value:state.interviewSettings.interviewDuration,
        interviewLanguage: n==10?value:state.interviewSettings.interviewLanguage,
        interviewMode: n==8?value:state.interviewSettings.interviewMode,
      },
    });
    setFieldValue(name,value);
  }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(name:string,value:String)=>{customSetFieldValue(name,value,8)}}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(name:string,value:String)=>{customSetFieldValue(name,value,9)}}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(name:string,value:String)=>{customSetFieldValue(name,value,10)}}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
