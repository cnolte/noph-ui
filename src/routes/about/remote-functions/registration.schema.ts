import * as v from 'valibot'

export type Plan = 'starter' | 'pro' | 'enterprise'

export const plans: { value: Plan; label: string }[] = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'enterprise', label: 'Enterprise' },
]

export const registrationSchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.nonEmpty('Enter your name.'),
		v.maxLength(80, 'Use 80 characters or fewer.'),
	),
	email: v.pipe(v.string(), v.trim(), v.email('Enter a valid email address.')),
	plan: v.picklist(
		plans.map((plan) => plan.value),
		'Choose a plan.',
	),
	startDate: v.pipe(v.string(), v.isoDate('Pick a start date.')),
	// Checkboxes send nothing when unchecked, so the field has to be optional with a default.
	acceptedTerms: v.pipe(
		v.optional(v.boolean(), false),
		v.literal(true, 'You must accept the terms.'),
	),
})

export type Registration = v.InferOutput<typeof registrationSchema>
