import type { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	type: string
	name: string
	errors?: string
}

export const FormField = ({ label, name, type, errors, ...rest }: Props) => {
	return (
		<aside className="flex flex-col justify-center max-w-3xl space-y-3">
			<label className="font-bold ">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full px-5 py-3 bg-transparent border-2 rounded-lg outline-none border-fuchsia-500"
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
	)
}
