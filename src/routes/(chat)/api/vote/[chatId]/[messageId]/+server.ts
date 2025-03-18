import { voteMessage } from '$lib/server/db/queries';
import { error } from '@sveltejs/kit';

export async function PATCH({ locals: { user }, params: { chatId, messageId }, request }) {
	if (!user) {
		error(401, 'Unauthorized');
	}

	const { type }: { type: 'up' | 'down' } = await request.json();

	// TODO votes are flawed, anyone can change the vote on any message
	return voteMessage({ chatId, messageId, type }).match(
		() => new Response('Message voted', { status: 200 }),
		() => error(500, 'An error occurred while processing your request')
	);
}
