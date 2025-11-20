// ============================================
// modules/hrlink/plugin.tsx
// ============================================

import {lazy} from 'react';
import type {ModulePlugin} from '@hrbox/modules/types';
import {RoleSlug} from '@hrbox/core/config/theme';
import {Profile, Briefcase, Building} from 'iconsax-reactjs';
import {lazyRouteComponent} from '@tanstack/react-router';
import {Paths} from "@hrbox/modules/paths";
import SkillsSubHeader from "@hrbox-monorepo/modules/hrlink/subheaders/SkillsSubHeader";

// ============================================
// Pages
// ============================================

const DashboardPage = lazyRouteComponent(() => import('./pages/dashboard'));
const ResumePage = lazyRouteComponent(() => import('./pages/resume/Information'));
const AwardPage = lazyRouteComponent(() => import('./pages/resume/Awards'));
const EducationPage = lazyRouteComponent(() => import('./pages/resume/Education'));
const SoftSkillsPage = lazyRouteComponent(() => import('./pages/resume/SoftSkills'));
const HardSkillsPage = lazyRouteComponent(() => import('./pages/resume/HardSkills'));
const ExperiencePage = lazyRouteComponent(() => import('./pages/resume/Experience'));
const JobOfferPage = lazyRouteComponent(() => import('./pages/jobs/JobOffers'));
const JobOpportunitiesPage = lazyRouteComponent(() => import('./pages/jobs/JobOpportunities'));
const CompanyPage = lazyRouteComponent(() => import('./pages/companies/Companies'));

// ============================================
// SubHeaders (Lazy Load)
// ============================================

const JobsSubHeader = lazyRouteComponent(() => import('./subheaders/JobSubHeader'));
const ResumeSubHeader = lazyRouteComponent(() => import('./subheaders/ResumeSubHeader'));
const AwardsSubHeader = lazyRouteComponent(() => import('./subheaders/AwardSubHeader'));

// ============================================
// Plugin Definition
// ============================================

export const HRLinkPlugin: ModulePlugin = {
    name: 'hrlink',
    version: '1.0.0',
    basePath: '/hrlink',
    layout: 'base',
    description: 'Job Seeker Portal',
    author: 'HRBox Team',

    // ============================================
    // Routes
    // ============================================
    routes: [
        {
            path: Paths.HRLink.Dashboard,
            component: DashboardPage,
            layout: 'base',
            meta: {
                title: 'Dashboard',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
        },

        {
            path: Paths.HRLink.ResumeInformation,
            component: ResumePage,
            layout: 'base',
            meta: {
                title: 'Resume',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: ResumeSubHeader,
        },
        {
            path: Paths.HRLink.ResumeAwards,
            component: AwardPage,
            layout: 'base',
            meta: {
                title: 'Awards',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: AwardsSubHeader,
        },
        {
            path: Paths.HRLink.ResumeSoftSkills,
            component: SoftSkillsPage,
            layout: 'base',
            meta: {
                title: 'Soft Skills',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: SkillsSubHeader,
        },
        {
            path: Paths.HRLink.ResumeHardSkills,
            component: HardSkillsPage,
            layout: 'base',
            meta: {
                title: 'Hard Skills',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: SkillsSubHeader,
        },
        {
            path: Paths.HRLink.JobOffers,
            component: JobOfferPage,
            layout: 'base',
            meta: {
                title: 'Job Offer',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: JobsSubHeader,
        },

        {
            path: Paths.HRLink.JobOpportunities,
            component: JobOpportunitiesPage,
            layout: 'base',
            meta: {
                title: 'Job Opportunities',
                requireAuth: false,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
            subHeader: JobsSubHeader,
        },


        {
            path: '/hrlink/company/:id',
            component: CompanyPage,
            layout: 'base',
            meta: {
                title: 'Company',
                requireAuth: true,
                requiredRoles: [RoleSlug.JOB_SEEKER],
            },
        },
    ],

    // ============================================
    // Menu
    // ============================================
    menu: [
        {
            id: 'dashboard',
            label: 'Dashboard',
            path: '/hrlink/dashboard',
            icon: <Profile size="24"/>,
        },
        {
            id: 'resume',
            label: 'Resume',
            path: '/hrlink/resume',
            icon: <Profile size="24"/>,
        },
        {
            id: 'jobs',
            label: 'Jobs',
            path: '/hrlink/jobs',
            icon: <Briefcase size="24"/>,
        },
        {
            id: 'company',
            label: 'Company',
            path: '/hrlink/company',
            icon: <Building size="24"/>,
        },
    ],

    requiredRoles: [RoleSlug.JOB_SEEKER],
    requiredPermissions: [],

    prefetch: async () => {
        console.log('Prefetching HRLink module...');
    },

    onModuleLoad: () => {
        console.log('HRLink module loaded');
    },

    onModuleUnload: () => {
        console.log('HRLink module unloaded');
    },
};

export default HRLinkPlugin;