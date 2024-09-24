'use client'

import { athleteNameAtomFamily, athleteResumeAtomFamily, dialogOpenAtomFamily } from "@/lib/state";
import { Button, Dialog, DialogPanel, DialogTitle,  } from "@headlessui/react"
import { useRecoilState, useRecoilValue } from "recoil";

export default function ResumeModal() {
    const [dialogOpen, setDialagOpen] = useRecoilState(dialogOpenAtomFamily('resume-dialog'));
    const [resume, setResume] = useRecoilState(athleteResumeAtomFamily('resume-dialog'));
    const [athleteName, setAthleteName] = useRecoilState(athleteNameAtomFamily('athlete-resume-name'));

    function open() {
        setDialagOpen(true)
    }
    
      function close() {
        setDialagOpen(false)
        setResume(null)
        setAthleteName(null)
      }

    return (<Dialog open={dialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 mt-10 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full pb-20 mx-4 sm:mx-20 rounded-xl bg-black/60 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="grid grid-cols-3 items-center">
                <Button
                    className="inline-flex w-16 text-center items-center rounded-md bg-gray-600/60 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={close}
                  >
                    <span className="text-center w-full">Close</span>
                  </Button>

                {/* <div className="flex items-center justify-center"> */}
                <DialogTitle as="h3" className="text-lg text-center font-medium text-white">
                {athleteName}
              </DialogTitle>

                {/* </div> */}


              </div>
              { resume &&
              <div className='flex-1 w-full h-full mt-4'>
                    <iframe src={resume} className='w-full min-h-[70vh]' />
                </div>}
                <div className="mt-4">
                
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>)
}