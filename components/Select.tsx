import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import { ChevronUpDownIcon, CircleCheck} from "@/components/Icons";

export interface Option {
    id: number;
    value: number;
    label: string;

}

interface SelectProps {
    options: Option[];
    selectedOption: Option;
    onChange: (value:Option) => void;
}

export default function Example({options, selectedOption, onChange}: SelectProps) {
    return (
        <Listbox value={selectedOption} by="id" as={"div"} onChange={onChange}>
            <div className="relative mt-1">
                <Listbox.Button
                    className={`relative w-full cursor-default rounded-lg py-4 pl-3 pr-10 text-left shadow-md focus:outline-none text-2xl`}>
                    <span className="block truncate text-white">{selectedOption.label}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 stroke-white"
                  aria-hidden="true"
              />
            </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-none ">
                        {options.map((option, idx) => (
                            <Listbox.Option
                                key={option.id}
                                className={({active, selected}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${selected ? 'bg-gray-500' : ''} ${active ? 'bg-gray-300 text-black' : 'text-gray-700'}`}
                                value={option}
                            >
                                {
                                    ({selected}) => (
                                        <>
                                  <span className={`block truncate ${selected ? 'font-bold bg-gray text-white' : 'font-normal'}`}>
                                    {option.label}
                                  </span>
                                            {selected ? (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                        <CircleCheck className="h-5 w-5 stroke-white fill-none" aria-hidden="true"/>
                                    </span>
                                            ) : null
                                            }
                                        </>
                                    )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}
