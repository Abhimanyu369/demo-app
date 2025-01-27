import { useState, useRef } from "react";
import { Button, Table, message } from "antd";
import ViewModal from "../components/ViewModal";
import AddModal from "../components/AddModal";
import { INITIAL_VALUES, VALIDATION_SCHEMA } from "../utils/constants";
import { handleDownload } from "../utils/helpers";

const FmeaPage = () => {
  const formikRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [data, setData] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (values) => {
    const updatedData = [values, ...data];
    setData(updatedData);
    message.success("Data saved successfully!");
    closeModal();
  };

  const openViewModal = (record) => {
    setViewData(record);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => setIsViewModalOpen(false);

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

      <div className="mb-4">
        <Button type="primary" onClick={openModal}>
          Add New Entry
        </Button>
        <Button type="default" onClick={() => handleDownload(data, message)} className="ml-2">
          Download Data
        </Button>
      </div>

      <Table
        className="mt-6"
        dataSource={data}
        columns={columns}
        rowKey={(record, index) => index}
      />

      <AddModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        formikRef={formikRef}
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        handleSubmit={handleSubmit}
      />

      <ViewModal
        isViewModalOpen={isViewModalOpen}
        closeViewModal={closeViewModal}
        viewData={viewData}
      />
    </div>
  );
};

export default FmeaPage;
