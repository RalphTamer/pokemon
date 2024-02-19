"use client"
import ErrorUI from "@/components/UI/ErrorUI"

function NotFoundPage() {
  return (
    <ErrorUI
      title="We're sorry"
      subtitle="The page you're trying to access cannot be found"
    />
  )
}

export default NotFoundPage
