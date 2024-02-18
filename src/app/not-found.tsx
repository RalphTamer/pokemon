"use client"
import ErrorUI from "@/components/UI/ErrorUI"
import ImageWrapper from "@/components/UI/ImageWrapper"
import Link from "next/link"

function NotFoundPage() {
  return (
    <ErrorUI
      title="We're sorry"
      subtitle="The page you're trying to access cannot be found"
    />
  )
}

export default NotFoundPage
