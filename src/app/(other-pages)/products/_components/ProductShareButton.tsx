"use client";

import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react"; // Import Modal directly
import { Share2 } from "lucide-react";
import { ShareSocial } from "react-share-social";

function ProductShareButton({ urlToShare }: { urlToShare: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="hidden sm:flex">
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2"
      >
        <Share2 size={20} />
      </button>

      <Modal
        dismissible
        show={openModal}
        size="md" // Medium size is usually better for share modals
        popup // Makes the close button look cleaner
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>
          <span className="p-4">Share this product with Others</span>
        </ModalHeader>
        <ModalBody>
          <div className="pt-2">
            <ShareSocial
              url={urlToShare}
              socialTypes={[
                "facebook",
                "twitter",
                "whatsapp",
                "linkedin",
                "email",
              ]}
              // Optional: style the container to match your app
              style={{
                root: {
                  background: "transparent",
                  padding: 0,
                },
                copyContainer: {
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                },
              }}
            />
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ProductShareButton;
