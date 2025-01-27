import { Modal, Button, Form, Input, InputNumber } from "antd";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import PropTypes from "prop-types";
import { DeleteOutlined } from "@ant-design/icons";

export default function AddModal({
  isModalOpen,
  closeModal,
  handleSubmit,
  initialValues,
  validationSchema,
  formikRef,
}) {
  return (
    <Modal
      title="Add Failure Mode"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={1000}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <FormikForm>
            <Form layout="vertical">
              <Form.Item label="Process / Process Step">
                <Input
                  name="processStep"
                  onChange={handleChange}
                  value={values.processStep}
                />
                {touched.processStep && errors.processStep && (
                  <div className="text-red-500">{errors.processStep}</div>
                )}
              </Form.Item>

              <FieldArray
                name="failureModes"
                render={(arrayHelpers) => (
                  <div>
                    {values.failureModes.map((mode, index) => (
                      <div key={index} className="border p-4 mb-4">
                        <h3 className="font-bold">Failure Mode {index + 1}</h3>
                        <div className="grid grid-cols-3 gap-x-4">
                          <Form.Item
                            label="Potential Failure Mode"
                            className="mb-2"
                          >
                            <Input
                              name={`failureModes.${index}.potentialFailureMode`}
                              onChange={handleChange}
                              value={
                                values.failureModes[index].potentialFailureMode
                              }
                            />
                            {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].potentialFailureMode && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].potentialFailureMode && (
                                    <div className="text-red-500">{errors.failureModes[index].potentialFailureMode}</div>
                                )
                            }
                          </Form.Item>
                          <Form.Item
                            label="Potential Failure Effects"
                            className="mb-2"
                          >
                            <Input
                              name={`failureModes.${index}.potentialFailureEffects`}
                              onChange={handleChange}
                              value={
                                values.failureModes[index]
                                  .potentialFailureEffects
                              }
                            />
                            {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].potentialFailureEffects && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].potentialFailureEffects && (
                                    <div className="text-red-500">{errors.failureModes[index].potentialFailureEffects}</div>
                                )
                            }
                          </Form.Item>
                          <Form.Item label="Potential Causes" className="mb-2">
                            <Input
                              name={`failureModes.${index}.potentialCauses`}
                              onChange={handleChange}
                              value={values.failureModes[index].potentialCauses}
                            />
                            {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].potentialCauses && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].potentialCauses && (
                                    <div className="text-red-500">{errors.failureModes[index].potentialCauses}</div>
                                )
                            }
                          </Form.Item>
                          <Form.Item label="Current Controls" className="mb-2">
                            <Input
                              name={`failureModes.${index}.currentControls`}
                              onChange={handleChange}
                              value={values.failureModes[index].currentControls}
                            />
                            {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].currentControls && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].currentControls && (
                                    <div className="text-red-500">{errors.failureModes[index].currentControls}</div>
                                )
                            }
                          </Form.Item>
                          <div className="col-span-2 grid grid-cols-4 gap-4">
                            <Form.Item label="SEV" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.sev`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.sev`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].sev}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].sev && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].sev && (
                                    <div className="text-red-500">{errors.failureModes[index].sev}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="OCC" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.occ`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.occ`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].occ}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].occ && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].occ && (
                                    <div className="text-red-500">{errors.failureModes[index].occ}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="DET" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.det`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.det`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].det}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].det && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].det && (
                                    <div className="text-red-500">{errors.failureModes[index].det}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="RPN" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.rpn`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.rpn`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].rpn}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].rpn && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].rpn && (
                                    <div className="text-red-500">{errors.failureModes[index].rpn}</div>
                                )
                              }
                            </Form.Item>
                          </div>
                          <Form.Item
                            label="Actions Recommended"
                            className="mb-2"
                          >
                            <Input
                              name={`failureModes.${index}.actionsRecommended`}
                              onChange={handleChange}
                              value={
                                values.failureModes[index].actionsRecommended
                              }
                            />
                            {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].actionsRecommended && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].actionsRecommended && (
                                    <div className="text-red-500">{errors.failureModes[index].actionsRecommended}</div>
                                )
                            }
                          </Form.Item>
                          <div className="col-span-2 grid grid-cols-4 gap-4">
                            <Form.Item label="SEV" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.sevRec`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.sevRec`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].sevRec}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].sevRec && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].sevRec && (
                                    <div className="text-red-500">{errors.failureModes[index].sevRec}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="OCC" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.occRec`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.occRec`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].occRec}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].occRec && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].occRec && (
                                    <div className="text-red-500">{errors.failureModes[index].occRec}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="DET" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.detRec`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.detRec`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].detRec}
                                min={1}
                                max={10}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].detRec && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].detRec && (
                                    <div className="text-red-500">{errors.failureModes[index].detRec}</div>
                                )
                              }
                            </Form.Item>
                            <Form.Item label="RPN" className="mb-2">
                              <InputNumber
                                className="w-full"
                                name={`failureModes.${index}.rpnRec`}
                                onChange={(value) =>
                                  handleChange({
                                    target: {
                                      name: `failureModes.${index}.rpnRec`,
                                      value,
                                    },
                                  })
                                }
                                value={values.failureModes[index].rpnRec}
                              />
                              {
                                touched.failureModes && touched.failureModes[index] && touched.failureModes[index].rpnRec && errors.failureModes && errors.failureModes[index] && errors.failureModes[index].rpnRec && (
                                    <div className="text-red-500">{errors.failureModes[index].rpnRec}</div>
                                )
                              }
                            </Form.Item>
                          </div>
                        </div>

                        <Button
                          type="primary"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() =>
                        arrayHelpers.push({
                          potentialFailureMode: "",
                          potentialFailureEffects: "",
                          sev: 1,
                          potentialCauses: "",
                          occ: 1,
                          currentControls: "",
                          det: 1,
                          rpn: 0,
                          actionsRecommended: "",
                          sevRec: 1,
                          occRec: 1,
                          detRec: 1,
                          rpnRec: 0,
                        })
                      }
                    >
                      Add Failure Mode
                    </Button>
                  </div>
                )}
              />

              <Button
                className="mt-4"
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
}

AddModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  formikRef: PropTypes.object.isRequired,
};
