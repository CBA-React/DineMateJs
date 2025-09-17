import { useForm, FormProvider, Controller } from "react-hook-form";
import { BellRing, Shield, SlidersHorizontal, PenLine } from "lucide-react";
import { DistanceSlider } from "/src/components/ui/DistanceSlider";
import { AgeRange } from "/src/components/ui/AgeRange";
import { Switch } from "/src/components/ui/Switch";
const TEXT = {
  title: "Settings",
  subtitle: "Manage your account preferences and privacy settings",
};

const defaultValues = {
  notifications: {
    newMatches: true,
    messages: true,
    events: true,
    marketing: false,
  },

  privacy: {
    showOnline: true,
    showDistance: true,
    incognito: false,
  },

  discovery: {
    distance: 80,
    ageMin: 32,
    ageMax: 28,
    platonic: false,
    verifiedOnly: false,
  },
};

const Settings = () => {
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { control, watch } = methods;
  const distance = watch("discovery.distance");

  return (
    <div className="relative w-full">
      <div
        className="pt-[180px] pb-[100px] relative"
        style={{
          background: "linear-gradient(270deg, #F2F2F2 0%, #FFEDEE 50%, #FFF0F1 100%)",
          minHeight: "600px",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-10 px-4">
          <header>
            <h2 className="font-serif font-medium text-4xl lg:text-5xl leading-tight bg-linear-to-b from-primary to-secondary bg-clip-text mb-2">
              <span className="text-transparent">{TEXT.title}</span>
            </h2>
            <p className="text-primary-text">{TEXT.subtitle}</p>
          </header>

          <FormProvider {...methods}>
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <Card>
                    <CardTitle icon={<BellRing className="text-primary" size={32} />}>
                      Notifications
                    </CardTitle>
                    <div className="flex flex-col gap-5">
                        <ToggleRow
                          control={control}
                          name="notifications.newMatches"
                          label="New Matches"
                          desc="Get notified when someone likes you back"
                        />
                        <ToggleRow
                          control={control}
                          name="notifications.messages"
                          label="Messages"
                          desc="Get notified about new messages"
                        />
                        <ToggleRow
                          control={control}
                          name="notifications.events"
                          label="Events"
                          desc="Get notified about upcoming events"
                        />
                        <ToggleRow
                          control={control}
                          name="notifications.marketing"
                          label="Marketing"
                          desc="Receive promotional emails and offers"
                        />
                    </div>
                  </Card>
                  <Card>
                    <CardTitle icon={<Shield className="text-secondary" size={32} />}>
                      Privacy
                    </CardTitle>
                    <div className="flex flex-col gap-5">
                        <ToggleRow
                          control={control}
                          name="privacy.showOnline"
                          label="Show Online Status"
                          desc="Let others see when you're active"
                          color="purple"
                          trackOnClass={"bg-secondary"}
                        />
                        <ToggleRow
                          control={control}
                          name="privacy.showDistance"
                          label="Show Distance"
                          desc="Display your distance to other users"
                          color="purple"
                          trackOnClass={"bg-secondary"}
                        />
                        <ToggleRow
                          control={control}
                          name="privacy.incognito"
                          label="Incognito Mode"
                          desc="Browse profiles without being seen"
                          color="purple"
                          trackOnClass={"bg-secondary"}
                        />
                        <Row>
                          <div>
                            <div className="text-[20px] text-primary-text">Password</div>
                            <p className=" text-fade-text">Change your account password</p>
                          </div>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2.5 text-primary-text underline self-end cursor-pointer"
                            onClick={() => (window.location.href = "/settings/password")}
                          >
                            <PenLine size={16} /> Reset Password
                          </button>
                        </Row>
                    </div>
                  </Card>
                </div>
                <Card>
                    <CardTitle icon={<SlidersHorizontal className="text-primary" size={32} />}>
                        Discovery Preferences
                    </CardTitle>

                    <div className="grid gap-10 lg:grid-cols-[1fr_1px_1fr]">
                        <div className="space-y-5">
                        <div>
                            <div className="flex items-center justify-between">
                            <span className="text-[20px] text-primary-text">Maximum Distance</span>
                            <span className="text-sm text-primary-text">
                                {methods.watch("discovery.distance")} mi
                            </span>
                            </div>

                            <DistanceSlider
                            control={control}
                            name="discovery.distance"
                            showSectionHeader={false}
                            showInlineLabel={false}
                            hideHelper
                            />
                        </div>

                        <div>
                            <div className="text-[20px] text-primary-text">Age Range</div>
                            <AgeRange control={control} label="" />
                        </div>
                        </div>

                        <div className="hidden lg:block w-px bg-primary-text/10" />

                        <div className="space-y-5">
                            <ToggleRow
                                control={control}
                                name="discovery.platonic"
                                label="Show Platonic Connections"
                                desc="Include people looking for friendship"
                            />
                            <ToggleRow
                                control={control}
                                name="discovery.verifiedOnly"
                                label="Verified Profiles Only"
                                desc="Only show verified users"
                            />
                        </div>
                    </div>
                </Card>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Settings;

/* ---------- UI helpers ---------- */

const Card = ({ children }) => (
  <section className="rounded-[10px] bg-white p-7">{children}</section>
);

const CardTitle = ({ children, icon }) => (
  <div className="mb-7 flex items-center gap-3">
    {icon}
    <h3 className="font-serif font-medium text-4xl text-primary-text">{children}</h3>
  </div>
);

const Row = ({ children }) => (
  <div className="flex items-center justify-between">
    {children}
  </div>
);

const ToggleRow = ({ control, name, label, desc, disabled = false, trackOnClass }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Row>
        <div className="flex flex-col gap-1">
          <div className="text-[20px] text-primary-text">{label}</div>
          {desc && <p className="text-fade-text">{desc}</p>}
        </div>
        <Switch
          checked={!!field.value}
          onChange={(v) => field.onChange(v)}
          disabled={disabled}
          label={label}
          className="self-end"
          size="md"
          trackOnClass={trackOnClass}
        />
      </Row>
    )}
  />
);
