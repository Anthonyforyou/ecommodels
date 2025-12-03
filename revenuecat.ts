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
    const currentOffering = offerings.current;

    if (!currentOffering || currentOffering.availablePackages.length === 0) {
      console.warn("Geen current offering of packages gevonden in RevenueCat");
      return false;
    }

    // Robust finding logic: checks rcBillingProduct (Web Billing) OR product (Stripe/Legacy)
    const pkg = currentOffering.availablePackages.find((p: any) => {
      const productIdentifier = p.rcBillingProduct?.identifier || p.product?.identifier;
      return productIdentifier === planIdentifier;
    });
      
    if (!pkg) {
        console.error("Geen matching package gevonden voor", planIdentifier);
        // Debug info
        const availableIds = currentOffering.availablePackages.map((p: any) => 
          p.rcBillingProduct?.identifier || p.product?.identifier || "unknown"
        );
        console.log("Beschikbare pakketten:", availableIds);
        return false;
    }

    console.log("Start aankoop voor:", pkg.identifier);

    // Use purchasePackage for Web SDK
    const { customerInfo } = await purchases.purchasePackage(pkg);
    const hasPro = !!customerInfo.entitlements.active[ENTITLEMENT_ID];

    return hasPro;
  } catch (error) {
    console.error("Aankoop mislukt:", error);
    return false;
  }
};