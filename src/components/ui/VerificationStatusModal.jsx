import Modal from "/src/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { clearVerificationStatus } from "/src/features/verification/verificationSlice";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const LABELS = new Map([
  ["approved", { title: "Verification Approved", color: "text-green-600", icon: CheckCircle2 }],
  ["declined", { title: "Verification Declined", color: "text-red-600", icon: XCircle }],
  ["unknown", { title: "Verification Issue", color: "text-amber-600", icon: AlertCircle }],
  ["created", { title: "Verification Created", color: "text-primary-text" }],
  ["started", { title: "Verification Started", color: "text-primary-text" }],
  ["submitted", { title: "Verification Submitted", color: "text-primary-text" }],
  ["resubmission_requested", { title: "Resubmission Requested", color: "text-primary-text" }],
  ["expired", { title: "Verification Expired", color: "text-primary-text" }],
  ["abandoned", { title: "Verification Abandoned", color: "text-primary-text" }],
  ["review", { title: "Verification In Review", color: "text-primary-text" }],
]);

export default function VerificationStatusModal() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.verification.status);
  const ts = useSelector((s) => s.verification.lastUpdateTs);

  const open = Boolean(status);
  const meta = LABELS.get(status) || { title: "Verification Update", color: "text-primary-text" };
  const Icon = meta.icon;

  return (
    <Modal open={open} onClose={() => dispatch(clearVerificationStatus())}>
      <div className="p-6">
        <div className="flex items-center gap-3">
          {Icon ? <Icon className={meta.color} size={24} /> : null}
          <h2 className={`text-xl font-semibold ${meta.color}`}>{meta.title}</h2>
        </div>
        <p className="text-sm text-fade-text mt-2">Current status: <span className="font-medium">{status}</span></p>
        {ts && <p className="text-xs text-fade-text mt-1">Updated at: {new Date(ts).toLocaleString()}</p>}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => dispatch(clearVerificationStatus())}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}


