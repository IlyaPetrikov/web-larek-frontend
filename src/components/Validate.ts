import { IValidationResult } from '../types';

export class Validate {
	static validateEmail(email: string): IValidationResult {
		const errors: string[] = [];
		if (!email) {
			errors.push('email_required');
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.push('email_invalid');
		}
		return { valid: errors.length === 0, errors };
	}

	static validatePhone(phone: string): IValidationResult {
		const digits = phone.replace(/\D/g, '');
		const errors: string[] = [];
		if (!digits) {
			errors.push('phone_required');
		} else if (digits.length !== 11) {
			errors.push('phone_invalid');
		}
		return { valid: errors.length === 0, errors };
	}

	static validateAddress(address: string): IValidationResult {
		const errors: string[] = [];
		if (!address.trim()) {
			errors.push('address_required');
		}
		return { valid: errors.length === 0, errors };
	}

	static validatePayment(payment: string | null): IValidationResult {
		const errors: string[] = [];
		if (!payment) {
			errors.push('payment_required');
		}
		return { valid: errors.length === 0, errors };
	}
	static validateContactInfo(email: string, phone: string): IValidationResult {
		const emailResult = this.validateEmail(email);
		const phoneResult = this.validatePhone(phone);
		return {
			valid: emailResult.valid && phoneResult.valid,
			errors: [...emailResult.errors, ...phoneResult.errors],
		};
	}

	static validateDelivery(
		payment: string | null,
		address: string
	): IValidationResult {
		const paymentResult = this.validatePayment(payment);
		const addressResult = this.validateAddress(address);
		return {
			valid: paymentResult.valid && addressResult.valid,
			errors: [...paymentResult.errors, ...addressResult.errors],
		};
	}
}
