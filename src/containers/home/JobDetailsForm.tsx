import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        // jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        console.log({ values });
        handleTab(2);
      },
    });

    const {useData} = require('./DataProvider')
    const {state, setState} = useData();

    const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>, n:number): void =>{
      // alert("Changed")
      setState({
        requisitionDetails: {
          gender: state.requisitionDetails.gender,
          noOfOpenings: state.requisitionDetails.noOfOpenings,
          requisitionTitle: state.requisitionDetails.requisitionTitle,
          urgency: state.requisitionDetails.urgency,
        },
        jobDetails: {
          jobDetails: n==6?e.target.value:state.jobDetails.jobDetails,
          jobLocation: n==7?e.target.value:state.jobDetails.jobLocation,
          jobTitle: n==5?e.target.value:state.jobDetails.jobTitle,
        },
        interviewSettings: {
          interviewDuration: state.interviewSettings.interviewDuration,
          interviewLanguage: state.interviewSettings.interviewLanguage,
          interviewMode: state.interviewSettings.interviewMode,
        },
      });
      handleChange(e);
    }

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e)=>{customHandleChange(e,5)}}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e)=>{customHandleChange(e,6)}}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e)=>{customHandleChange(e,7)}}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
