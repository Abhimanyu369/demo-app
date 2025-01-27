import { Modal } from "antd";
import PropTypes from "prop-types";

export default function ViewModal({
  isViewModalOpen,
  closeViewModal,
  viewData,
}) {
  return (
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
            <strong>Process / Process Step:</strong> {viewData?.processStep}
          </p>

          <h3 className="mt-4 mb-2 font-semibold">Failure Modes:</h3>
          {viewData?.failureModes?.map((mode, index) => (
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
                <strong>Actions Recommended:</strong> {mode.actionsRecommended}
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
  );
}

ViewModal.propTypes = {
  isViewModalOpen: PropTypes.bool.isRequired,
  closeViewModal: PropTypes.func.isRequired,
  viewData: PropTypes.object,
};
