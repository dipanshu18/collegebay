"use client";

import { useFormStatus } from "react-dom";
import { useState, type FormEvent } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Star } from "lucide-react";
import { sendFeedback } from "@/actions/post";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type StarRatingProps = {
  rating: number;
  setRating: (value: number) => void;
};

function StarRating({ rating, setRating }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl ${
            rating >= star ? "text-yellow-400" : "text-gray-300"
          } hover:scale-110 transition-transform`}
        >
          <Star />
        </button>
      ))}
    </div>
  );
}

export function FeedbackForm({ postId }: { postId: string }) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [rating, setRating] = useState(1);
  const [remark, setRemark] = useState("");

  async function handleSendFeedback(e: FormEvent) {
    e.preventDefault();

    const response = await sendFeedback({ postId, rating, remark });

    if (response?.error) {
      const errorMsg = response.error;
      return toast.error(errorMsg);
    }

    toast.success(response?.success);
    return window.location.reload();
  }

  return (
    <form onSubmit={handleSendFeedback} className="space-y-5">
      <div>
        <Label>Rating</Label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="space-y-2">
        <Label>Remark</Label>
        <Textarea
          placeholder="enter your remark about seller and product that you purchased..."
          rows={7}
          onChange={(e) => setRemark(e.target.value)}
          value={remark}
        />
      </div>

      <Button>{pending ? "Submitting..." : "Submit"}</Button>
    </form>
  );
}
