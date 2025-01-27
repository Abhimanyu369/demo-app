import { useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Popover,
  message,
} from "antd";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { DeleteOutlined } from "@ant-design/icons";
import * as Yup from "yup";

const FmeaPage = () => {
  const formikRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues = {
    processStep: "",
    failureModes: [
      {
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
      },
    ],
  };

  const validationSchema = Yup.object({
    processStep: Yup.string().required("Process Step is required"),
    failureModes: Yup.array().of(
      Yup.object().shape({
        potentialFailureMode: Yup.string().required("This field is required"),
        potentialFailureEffects: Yup.string().required(
          "This field is required"
        ),
        sev: Yup.number().required("Required").min(1).max(10),
        potentialCauses: Yup.string().required("This field is required"),
        occ: Yup.number().required("Required").min(1).max(10),
        currentControls: Yup.string().required("This field is required"),
        det: Yup.number().required("Required").min(1).max(10),
        rpn: Yup.number(),
        actionsRecommended: Yup.string().required("This field is required"),
        sevRec: Yup.number().required("Required").min(1).max(10),
        occRec: Yup.number().required("Required").min(1).max(10),
        detRec: Yup.number().required("Required").min(1).max(10),
        rpnRec: Yup.number(),
      })
    ),
  });

  const openModal = () => {
    setIsModalOpen(true);
    if (formikRef.current) {
      formikRef.current.resetForm(); // Reset the form to initial values
    }
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values) => {
    const updatedData = [...data, values];
    setData(updatedData);
    message.success("Data saved successfully!");
    setTimeout(() => setIsSuccess(false), 2000);
    closeModal();
  };

  const openViewModal = (record) => {
    setViewData(record);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => setIsViewModalOpen(false);

  const handleDownload = () => {
    if (data.length === 0) {
      message.warning("No data available to download");
      return;
    }

    // Extract the headers
    const headers = [
      "Process / Process Step",
      "Potential Failure Mode",
      "Potential Failure Effects",
      "SEV",
      "Potential Causes",
      "OCC",
      "Current Controls",
      "DET",
      "RPN",
      "Actions Recommended",
      "SEV",
      "OCC",
      "DET",
      "RPN",
    ];

    // Build CSV rows
    const rows = data.flatMap((entry) =>
      entry.failureModes.map((mode) => [
        entry.processStep,
        mode.potentialFailureMode,
        mode.potentialFailureEffects,
        mode.sev,
        mode.potentialCauses,
        mode.occ,
        mode.currentControls,
        mode.det,
        mode.rpn,
        mode.actionsRecommended,
        mode.sevRec,
        mode.occRec,
        mode.detRec,
        mode.rpnRec,
      ])
    );

    // Combine headers and rows into a CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fmea_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: "Process / Process Step",
      dataIndex: "processStep",
      key: "processStep",
    },
    {
      title: "Potential Failure Mode",
      dataIndex: "failureModes",
      key: "failureModes",
      render: (failureModes) =>
        failureModes.map((mode, index) => (
          <div key={index}>{mode.potentialFailureMode}</div>
        )),
    },
    {
      title: "Potential Failure Effects",
      dataIndex: "failureModes",
      key: "potentialFailureEffects",
      render: (failureModes) =>
        failureModes.map((mode, index) => (
          <div key={index}>{mode.potentialFailureEffects}</div>
        )),
    },
    {
      title: "SEV",
      dataIndex: "failureModes",
      key: "sev",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.sev}</div>),
    },
    {
      title: "Potential Causes",
      dataIndex: "failureModes",
      key: "potentialCauses",
      render: (failureModes) =>
        failureModes.map((mode, index) => (
          <div key={index}>{mode.potentialCauses}</div>
        )),
    },
    {
      title: "OCC",
      dataIndex: "failureModes",
      key: "occ",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.occ}</div>),
    },
    {
      title: "Current Controls",
      dataIndex: "failureModes",
      key: "currentControls",
      render: (failureModes) =>
        failureModes.map((mode, index) => (
          <div key={index}>{mode.currentControls}</div>
        )),
    },
    {
      title: "DET",
      dataIndex: "failureModes",
      key: "det",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.det}</div>),
    },
    {
      title: "RPN",
      dataIndex: "failureModes",
      key: "rpn",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.rpn}</div>),
    },
    {
      title: "Actions Recommended",
      dataIndex: "failureModes",
      key: "actionsRecommended",
      render: (failureModes) =>
        failureModes.map((mode, index) => (
          <div key={index}>{mode.actionsRecommended}</div>
        )),
    },
    {
      title: "SEV",
      dataIndex: "failureModes",
      key: "sevRec",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.sevRec}</div>),
    },
    {
      title: "OCC",
      dataIndex: "failureModes",
      key: "occRec",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.occRec}</div>),
    },
    {
      title: "DET",
      dataIndex: "failureModes",
      key: "detRec",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.detRec}</div>),
    },
    {
      title: "RPN",
      dataIndex: "failureModes",
      key: "rpnRec",
      render: (failureModes) =>
        failureModes.map((mode, index) => <div key={index}>{mode.rpnRec}</div>),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => openViewModal(record)}
            className="mr-2"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Failure Mode & Effect Analysis
      </h1>

      {isSuccess && (
        <Popover content="Data saved successfully!" trigger="click" open={true}>
          <Button type="primary">Success</Button>
        </Popover>
      )}

      <div className="mb-4">
        <Button type="primary" onClick={openModal}>
          Add New Entry
        </Button>
        <Button type="default" onClick={handleDownload} className="ml-2">
          Download Data
        </Button>
      </div>

      <Table
        className="mt-6"
        dataSource={data}
        columns={columns}
        rowKey={(record, index) => index}
      />

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
                          <h3 className="font-bold">
                            Failure Mode {index + 1}
                          </h3>
                          <div className="grid grid-cols-3 gap-x-4">
                            <Form.Item
                              label="Potential Failure Mode"
                              className="mb-2"
                            >
                              <Input
                                name={`failureModes.${index}.potentialFailureMode`}
                                onChange={handleChange}
                                value={
                                  values.failureModes[index]
                                    .potentialFailureMode
                                }
                              />
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
                            </Form.Item>
                            <Form.Item
                              label="Potential Causes"
                              className="mb-2"
                            >
                              <Input
                                name={`failureModes.${index}.potentialCauses`}
                                onChange={handleChange}
                                value={
                                  values.failureModes[index].potentialCauses
                                }
                              />
                            </Form.Item>
                            <Form.Item
                              label="Current Controls"
                              className="mb-2"
                            >
                              <Input
                                name={`failureModes.${index}.currentControls`}
                                onChange={handleChange}
                                value={
                                  values.failureModes[index].currentControls
                                }
                              />
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

      {/* View Modal */}
      <Modal
        title="View Failure Mode Details"
        visible={isViewModalOpen}
        onCancel={closeViewModal}
        footer={null}
        width={1000}
      >
        {viewData && (
          <div>
            <p>
              <strong>Process / Process Step:</strong> {viewData.processStep}
            </p>

            <h3 className="mt-4 mb-2 font-semibold">Failure Modes:</h3>
            {viewData.failureModes.map((mode, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 mb-4 rounded-lg bg-gray-50"
              >
                <p>
                  <strong>Potential Failure Mode:</strong>{" "}
                  {mode.potentialFailureMode}
                </p>
                <p>
                  <strong>Potential Failure Effects:</strong>{" "}
                  {mode.potentialFailureEffects}
                </p>
                <p>
                  <strong>SEV:</strong> {mode.sev}
                </p>
                <p>
                  <strong>OCC:</strong> {mode.occ}
                </p>
                <p>
                  <strong>DET:</strong> {mode.det}
                </p>
                <p>
                  <strong>RPN:</strong> {mode.rpn}
                </p>
                <p>
                  <strong>Actions Recommended:</strong>{" "}
                  {mode.actionsRecommended}
                </p>
                <hr className="my-2" />
                <p>
                  <strong>SEV:</strong> {mode.sevRec}
                </p>
                <p>
                  <strong>OCC:</strong> {mode.occRec}
                </p>
                <p>
                  <strong>DET:</strong> {mode.detRec}
                </p>
                <p>
                  <strong>RPN:</strong> {mode.rpnRec}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FmeaPage;
