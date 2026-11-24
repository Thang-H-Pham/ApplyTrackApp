// `#lib/*` (package.json "imports") maps paths 1:1, so it needs the file extension
import { supabase } from '#lib/supabaseClient.ts';
import type { PageServerLoad } from './$types';

// Shape of a row in the quickstart `countries` table (no generated DB types yet)
type Country = { id: number; name: string };

export const load: PageServerLoad = async () => {
	const { data } = await supabase.from('countries').select();
	return {
		countries: (data ?? []) as Country[]
	};
};
