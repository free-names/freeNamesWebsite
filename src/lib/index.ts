/* src/lib/index.ts
 * MIT Licence — (c) Free Names
 */

// Constants shared across every page

// Site

export const siteName = 'Free Names';

export const websiteDomain = 'free-names.org';

export const websiteUrl = `https://${websiteDomain}`;

export const docsUrl = `https://docs.${websiteDomain}`;

export const githubOrg = 'free-names';

export const githubUrl = `https://github.com/${githubOrg}`;

export const discordInvite = 'https://discord.gg/KFEN5E3PyR';

// Domains

export type FreeDomain = {
	name: string;
	// GitHub "owner/repo" holding domains/*.json, or null while it isn't set up yet
	repo: string | null;
};

export const domains: FreeDomain[] = [
	{
		name: 'meowed-at.me',
		repo: `${githubOrg}/meowed-at.me`
	},
	{
		name: 'is-a.stupid.cat',
		repo: `${githubOrg}/is-a.stupid.cat`
	},
	{
		name: 'has-a.space',
		repo: `${githubOrg}/has-a.space`
	},
	{
		name: 'is-a.wiki',
		repo: `${githubOrg}/is-a-wiki`
	}
];
