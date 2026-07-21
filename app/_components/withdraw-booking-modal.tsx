"use client";

import { AlertTriangle, X } from "lucide-react";

type WithdrawBookingModalProps = {
  roomTitle: string;
  isWithdrawing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function WithdrawBookingModal({
  roomTitle,
  isWithdrawing,
  onConfirm,
  onCancel,
}: WithdrawBookingModalProps) {
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="withdraw-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl shadow-slate-950/40 dark:bg-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
          aria-label="Close"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <AlertTriangle
          size={48}
          className="mx-auto text-amber-500"
          aria-hidden="true"
        />

        <h2
          id="withdraw-modal-title"
          className="mt-4 text-xl font-black text-slate-950 dark:text-white"
        >
          Withdraw this request?
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Are you sure you want to withdraw your booking request for{" "}
          <strong className="font-black text-slate-900 dark:text-white">
            &quot;{roomTitle}&quot;
          </strong>
          ?
        </p>
        <p className="mt-2 text-xs font-bold text-slate-400 dark:text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isWithdrawing}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-700 transition hover:bg-slate-200 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            No, Keep It
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isWithdrawing}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-rose-600 text-sm font-black text-white transition hover:bg-rose-700 disabled:opacity-60"
          >
            {isWithdrawing ? "Withdrawing..." : "Yes, Withdraw"}
          </button>
        </div>
      </div>
    </div>
  );
}
