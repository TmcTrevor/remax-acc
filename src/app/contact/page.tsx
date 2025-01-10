import { Suspense } from "react";
import PageHeader from "../components/pageHeader";
import ContactContent from "../components/ContactContent";
export default function Contact() {
  return (
    <div className="mx-auto w-full">
      <PageHeader title="Contact Us" />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-16 h-16 border-4 border-mainColor border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
        <ContactContent />
      </Suspense>
    </div>
  );
}
