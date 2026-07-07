"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CornerDownLeft,
  Headphones,
  HelpCircle,
  MessageSquare,
  Truck,
} from "lucide-react";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

export function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        className="hidden items-center space-x-1 text-foreground transition-colors hover:text-primary md:flex"
        aria-label="Help"
      >
        <HelpCircle className="size-5" />
        <span className="text-sm">Help</span>
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>
          Need Help with Shopping? Talk to our Help Desk
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <Link
              href="tel:08023440000"
              className="flex items-center space-x-3 text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <span>Call: 08023440000</span>
            </Link>

            <Link
              href="/dashboard/orders"
              className="flex items-center space-x-3 text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <span>Track your Order</span>
            </Link>

            <Link
              href="#"
              className="flex items-center space-x-3 text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CornerDownLeft className="h-5 w-5 text-primary" />
              </div>
              <span>Returns and Refunds</span>
            </Link>

            <Link
              href="#"
              className="flex items-center space-x-3 text-foreground"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <span>Chat with Us</span>
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
