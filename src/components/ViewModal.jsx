import { Modal, Table } from "antd";
import PropTypes from "prop-types";

export default function ViewModal({ isViewModalOpen, closeViewModal, viewData }) {
  const columns = [
    {
      title: "Process / Process Step",
      dataIndex: "processStep",
      key: "processStep",
      render: (_, record) => ({
        children: record.processStep,
        props: { rowSpan: record.isFirst ? record.rowSpan : 0 },
      }),
    },
    {
      title: "Potential Failure Mode",
      dataIndex: "potentialFailureMode",
      key: "potentialFailureMode",
    },
    {
      title: "Potential Failure Effects",
      dataIndex: "potentialFailureEffects",
      key: "potentialFailureEffects",
    },
    {
      title: "SEV",
      dataIndex: "sev",
      key: "sev",
    },
    {
      title: "OCC",
      dataIndex: "occ",
      key: "occ",
    },
    {
      title: "DET",
      dataIndex: "det",
      key: "det",
    },
    {
      title: "RPN",
      dataIndex: "rpn",
      key: "rpn",
    },
    {
      title: "Actions Recommended",
      dataIndex: "actionsRecommended",
      key: "actionsRecommended",
    },
    {
      title: "SEV",
      dataIndex: "sevRec",
      key: "sevRec",
    },
    {
      title: "OCC",
      dataIndex: "occRec",
      key: "occRec",
    },
    {
      title: "DET",
      dataIndex: "detRec",
      key: "detRec",
    },
    {
      title: "RPN",
      dataIndex: "rpnRec",
      key: "rpnRec",
    },
  ];

  // Transforming the data for table display
  const tableData = [];
  if (viewData) {
    viewData.failureModes.forEach((mode, index) => {
      tableData.push({
        key: `${viewData.processStep}-${index}`,
        processStep: index === 0 ? viewData.processStep : "",
        isFirst: index === 0,
        rowSpan: viewData.failureModes.length,
        potentialFailureMode: mode.potentialFailureMode,
        potentialFailureEffects: mode.potentialFailureEffects,
        sev: mode.sev,
        occ: mode.occ,
        det: mode.det,
        rpn: mode.rpn,
        actionsRecommended: mode.actionsRecommended,
        sevRec: mode.sevRec,
        occRec: mode.occRec,
        detRec: mode.detRec,
        rpnRec: mode.rpnRec,
      });
    });
  }

  return (
    <Modal
      title="View Failure Mode Details"
      visible={isViewModalOpen}
      onCancel={closeViewModal}
      footer={null}
      width={1200}
    >
      {viewData && (
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
        />
      )}
    </Modal>
  );
}

ViewModal.propTypes = {
  isViewModalOpen: PropTypes.bool.isRequired,
  closeViewModal: PropTypes.func.isRequired,
  viewData: PropTypes.object,
};
