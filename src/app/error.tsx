"use client"

import ErrorUI from "@/components/ErrorUI"
import Button from "@/components/UI/Button"

type Props = {
  error: Error
  reset: () => void
}
const ErrorPage = (props: Props) => {
  return (
    <>
      <ErrorUI
        title="Uh Oh"
        subtitle={props.error.message + " Maybe try again?"}
      >
        <div className="flex justify-center">
          <Button onClick={props.reset}>Try Again</Button>
        </div>
      </ErrorUI>
    </>
  )
}

export default ErrorPage
