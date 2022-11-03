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
				className="w-full px-5 py-3 border-2 border-purple-500 rounded-lg outline-none"
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
		</aside>
	)
}
