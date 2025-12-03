// revenuecat.ts
import { Purchases, Package } from "@revenuecat/purchases-js";

const API_KEY = "test_hsmdQhSVDpjneCPIxxyOtyzKCbE";
const ENTITLEMENT_ID = "Ecommodels Pro";

let isInitialized = false;

export const initializeRevenueCat = () => {
  if (isInitialized && Purchases.isConfigured()) return;

  const appUserId = Purchases.generateRevenueCatAnonymousAppUserId();

  Purchases.configure({
    apiKey: API_KEY,
    appUserId,
  });

  isInitialized = true;
  console.log("RevenueCat initialized met appUserId:", appUserId);
};

export const checkSubscriptionStatus = async (): Promise<boolean> => {
  try {
    if (!isInitialized || !Purchases.isConfigured()) {
      initializeRevenueCat();
    }

    const purchases = Purchases.getSharedInstance();
    const customerInfo = await purchases.getCustomerInfo();

    const hasPro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
    return hasPro;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
};

export const purchaseSubscription = async (
  planIdentifier: string
): Promise<boolean> => {
  try {
    if (!isInitialized || !Purchases.isConfigured()) {
      initializeRevenueCat();
    }

    const purchases = Purchases.getSharedInstance();
    const offerings = await purchases.getOfferings();
    
    // Logic: Look for 'current' offering first, then try to find 'Premium' offering specifically
    // based on user input that the offering is named 'Premium'.
    let offering = offerings.current;
    
    if (!offering && offerings.all["Premium"]) {
        offering = offerings.all["Premium"];
        console.log("Using specific 'Premium' offering as Current was null");
    }

    if (!offering || offering.availablePackages.length === 0) {
      console.warn("Geen geldige offering of packages gevonden in RevenueCat. Controleer of de Offering 'Premium' heet in het Dashboard.");
      console.log("Available Offerings Keys:", Object.keys(offerings.all));
      return false;
    }

    // Robust finding logic: matches the identifier passed from constants.ts (Premium_montly)
    const pkg = offering.availablePackages.find((p: any) => {
      const productIdentifier = p.rcBillingProduct?.identifier || p.product?.identifier;
      return productIdentifier === planIdentifier;
    });
      
    if (!pkg) {
        console.error("Geen matching package gevonden voor ID:", planIdentifier);
        // Debug info
        const availableIds = offering.availablePackages.map((p: any) => 
          p.rcBillingProduct?.identifier || p.product?.identifier || "unknown"
        );
        console.log("Beschikbare pakketten in deze offering:", availableIds);
        return false;
    }

    console.log("Start aankoop voor package:", pkg.identifier);

    // Use purchasePackage for Web SDK
    const { customerInfo } = await purchases.purchasePackage(pkg);
    const hasPro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];

    return hasPro;
  } catch (error) {
    console.error("Aankoop mislukt:", error);
    return false;
  }
};