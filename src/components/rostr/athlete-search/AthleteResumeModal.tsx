'use client'

import { athleteResumeAtomFamily, dialogOpenAtomFamily } from "@/lib/state";
import { Button, Dialog, DialogPanel, DialogTitle,  } from "@headlessui/react"
import { useRecoilState, useRecoilValue } from "recoil";

export default function ResumeModal() {
    const [dialogOpen, setDialagOpen] = useRecoilState(dialogOpenAtomFamily('resume-dialog'));
    const resume = useRecoilValue(athleteResumeAtomFamily('resume-dialog'));

    function open() {
        setDialagOpen(true)
    }
    
      function close() {
        setDialagOpen(false)
      }

    return (<Dialog open={dialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full mx-4 sm:mx-20 rounded-xl bg-gray-900/60 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Payment successful
              </DialogTitle>{ resume &&
              <div className='flex-1 w-full h-full'>
                    <iframe src={resume} className='w-full min-h-[70vh]' />
                </div>}
                <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>)
}