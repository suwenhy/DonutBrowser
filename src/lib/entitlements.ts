import type { CloudUser, Entitlements } from "@/types";

const DEFAULT_REQUESTS_PER_HOUR = 100;

interface Capabilities {
  browserAutomation: boolean;
  crossOsFingerprints: boolean;
  cloudBackup: boolean;
  teamCollaboration: boolean;
}

const LOCAL_CAPABILITIES: Entitlements = {
  active: false,
  browserAutomation: true,
  crossOsFingerprints: true,
  cloudBackup: false,
  teamCollaboration: false,
  profileLimit: Number.MAX_SAFE_INTEGER,
  requestsPerHour: 0,
};

// Mirror of PLAN_CAPABILITIES in apps/backend/src/plans/entitlements.ts. Keep in
// sync — a new plan must be declared here too, or it falls back to DEFAULT_PAID.
const PLAN_CAPABILITIES: Record<string, Capabilities> = {
  starter: {
    browserAutomation: false,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: false,
  },
  pro: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: false,
  },
  team: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: true,
  },
  enterprise: {
    browserAutomation: true,
    crossOsFingerprints: true,
    cloudBackup: true,
    teamCollaboration: true,
  },
};

// Unknown paid plan -> pro-level (never team), matching the backend default.
const DEFAULT_PAID: Capabilities = {
  browserAutomation: true,
  crossOsFingerprints: true,
  cloudBackup: true,
  teamCollaboration: false,
};

/**
 * The user's effective entitlements. Prefers the backend-resolved object the
 * desktop attaches to CloudUser; only falls back to deriving from the plan
 * fields when it's missing (older cached state). The fallback mirrors the
 * backend matrix in `apps/backend/src/plans/entitlements.ts`.
 */
export function getEntitlements(
  user: CloudUser | null | undefined,
): Entitlements {
  if (!user) return LOCAL_CAPABILITIES;

  const cloudEntitlements =
    user.entitlements ??
    (() => {
      const active =
        user.plan !== "free" &&
        (user.subscriptionStatus === "active" ||
          user.planPeriod === "lifetime");
      if (!active) return LOCAL_CAPABILITIES;

      const caps = PLAN_CAPABILITIES[user.plan] ?? DEFAULT_PAID;
      return {
        active: true,
        browserAutomation: caps.browserAutomation,
        crossOsFingerprints: caps.crossOsFingerprints,
        cloudBackup: caps.cloudBackup,
        teamCollaboration: caps.teamCollaboration,
        profileLimit: user.profileLimit,
        requestsPerHour: caps.browserAutomation ? DEFAULT_REQUESTS_PER_HOUR : 0,
      };
    })();

  // Local capabilities belong to this open-source desktop build and do not
  // depend on a Donut account. Only hosted backup/team capabilities continue
  // to come from the authenticated cloud account.
  return {
    ...cloudEntitlements,
    browserAutomation: true,
    crossOsFingerprints: true,
    profileLimit: Number.MAX_SAFE_INTEGER,
    requestsPerHour: 0,
  };
}
