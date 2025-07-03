"use client";

import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { Share2 } from "lucide-react";

import { ShareSocial } from "react-share-social";

function ProductShareButton({ urlToShare }: { urlToShare: string }) {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <Share2 />
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Share this product with Others</Modal.Header>
        <Modal.Body>
          <ShareSocial
            url={urlToShare}
            socialTypes={[
              "facebook",
              "twitter",
              "whatsapp",
              "linkedin",
              "email",
            ]}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductShareButton;
