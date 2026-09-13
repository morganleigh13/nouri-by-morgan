"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  createClassSession,
  deleteClassSession,
  saveSiteContent,
  updateClassSession,
  verifyOwnerSession,
} from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { removeClass, replaceCarousel, setAboutMe, upsertClass } from "@/redux/slices/studioSlice";

const emptyClass = {
  title: "",
  discipline: "Yoga",
  schedule: "",
  location: "",
  description: "",
  ctaLabel: "Reserve",
};

export default function OwnerDashboard({ slug }) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const siteContent = useAppSelector((state) => state.studio.siteContent);
  const classes = useAppSelector((state) => state.studio.classes);

  const defaultAboutForm = useMemo(
    () => ({
      heroTagline: siteContent.heroTagline,
      aboutMeTitle: siteContent.aboutMeTitle,
      aboutMeBody: siteContent.aboutMeBody,
      carouselUrls: siteContent.carouselImages.map((image) => image.src).join("\n"),
    }),
    [siteContent],
  );
  const [newClass, setNewClass] = useState(emptyClass);
  const [classDrafts, setClassDrafts] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [isCreatingClass, setIsCreatingClass] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const authorize = async () => {
      if (!auth.token) {
        setIsAuthorizing(false);
        return;
      }

      try {
        await verifyOwnerSession(auth.token);
      } catch {
        if (isMounted) {
          dispatch(logout());
        }
      } finally {
        if (isMounted) {
          setIsAuthorizing(false);
        }
      }
    };

    authorize();

    return () => {
      isMounted = false;
    };
  }, [auth.token, dispatch]);

  const handleDraftChange = (classId, field, value) => {
    setClassDrafts((current) => ({
      ...current,
      [classId]: {
        ...getClassDraft(current, classes, classId),
        [field]: value,
      },
    }));
  };

  const handleNewClassChange = (event) => {
    const { name, value } = event.target;
    setNewClass((current) => ({ ...current, [name]: value }));
  };

  const handleCreateClass = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setErrorMessage("");
    setIsCreatingClass(true);

    try {
      const created = await createClassSession(newClass, auth.token);
      dispatch(upsertClass(created));
      setNewClass(emptyClass);
      setStatusMessage("Class created.");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
    } finally {
      setIsCreatingClass(false);
    }
  };

  const handleSaveClass = async (classId) => {
    setStatusMessage("");
    setErrorMessage("");

    try {
      const updated = await updateClassSession(classId, getClassDraft(classDrafts, classes, classId), auth.token);
      dispatch(upsertClass(updated));
      setClassDrafts((current) => {
        const nextDrafts = { ...current };
        delete nextDrafts[classId];
        return nextDrafts;
      });
      setStatusMessage(`Updated ${updated.title}.`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteClass = async (classId) => {
    setStatusMessage("");
    setErrorMessage("");

    try {
      await deleteClassSession(classId, auth.token);
      dispatch(removeClass(classId));
      setClassDrafts((current) => {
        const nextDrafts = { ...current };
        delete nextDrafts[classId];
        return nextDrafts;
      });
      setStatusMessage("Class removed.");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  if (isAuthorizing) {
    return (
      <section className="page-shell">
        <div className="glass-card px-8 py-12 text-center text-slate-600">Checking owner session...</div>
      </section>
    );
  }

  if (!auth.token) {
    return (
      <section className="page-shell">
        <div className="mx-auto max-w-2xl glass-card px-8 py-12 text-center">
          <h1 className="text-3xl font-semibold text-slate-950">Owner session required</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">Use the private login page to access this dashboard.</p>
          <Link href={`/portal/${slug}/login`} className="btn btn-warning mt-6 rounded-full px-6 text-base text-amber-950">
            Go to login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell space-y-8">
      <div className="glass-card flex flex-col gap-4 px-8 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-kicker">Owner dashboard</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Update classes, your story, and homepage visuals.</h1>
        </div>
        <button
          className="btn btn-ghost rounded-full border border-slate-200 px-6 text-base"
          onClick={() => dispatch(logout())}
          type="button"
        >
          Logout
        </button>
      </div>

      {statusMessage ? <div className="alert alert-success rounded-3xl">{statusMessage}</div> : null}
      {errorMessage ? <div className="alert alert-error rounded-3xl">{errorMessage}</div> : null}

      <AboutContentForm
        authToken={auth.token}
        defaultValue={defaultAboutForm}
        onError={setErrorMessage}
        onSuccess={setStatusMessage}
        onUpdate={(response) => {
          dispatch(setAboutMe(response));
          dispatch(replaceCarousel(response.carouselImages));
        }}
      />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form className="glass-card space-y-4 px-8 py-10" onSubmit={handleCreateClass}>
          <div>
            <p className="section-kicker">Add a class</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Create a new upcoming class</h2>
          </div>
          <DashboardClassFields value={newClass} onChange={handleNewClassChange} />
          <button className="btn btn-warning rounded-full px-6 text-base text-amber-950" disabled={isCreatingClass}>
            {isCreatingClass ? "Adding..." : "Add class"}
          </button>
        </form>

        <div className="glass-card space-y-6 px-8 py-10 lg:px-10">
          <div>
            <p className="section-kicker">Edit classes</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Maintain the live schedule</h2>
          </div>
          <div className="space-y-5">
            {classes.map((session) => (
              <div key={session.id} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-5 shadow-sm">
                <DashboardClassFields
                  value={getClassDraft(classDrafts, classes, session.id)}
                  onChange={(event) => handleDraftChange(session.id, event.target.name, event.target.value)}
                  fieldPrefix={session.id}
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-warning rounded-full px-5 text-amber-950"
                    onClick={() => handleSaveClass(session.id)}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost rounded-full border border-red-200 px-5 text-red-600"
                    onClick={() => handleDeleteClass(session.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutContentForm({ authToken, defaultValue, onError, onSuccess, onUpdate }) {
  const formRef = useRef(null);
  const [isSavingContent, setIsSavingContent] = useState(false);

  useEffect(() => {
    if (!formRef.current) {
      return;
    }

    formRef.current.elements.heroTagline.value = defaultValue.heroTagline;
    formRef.current.elements.aboutMeTitle.value = defaultValue.aboutMeTitle;
    formRef.current.elements.aboutMeBody.value = defaultValue.aboutMeBody;
    formRef.current.elements.carouselUrls.value = defaultValue.carouselUrls;
  }, [defaultValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSuccess("");
    onError("");
    setIsSavingContent(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await saveSiteContent(
        {
          heroTagline: formData.get("heroTagline")?.toString() || "",
          aboutMeTitle: formData.get("aboutMeTitle")?.toString() || "",
          aboutMeBody: formData.get("aboutMeBody")?.toString() || "",
          carouselImages: normalizeCarouselImages(formData.get("carouselUrls")?.toString() || ""),
        },
        authToken,
      );
      onUpdate(response);
      onSuccess("Site content updated.");
    } catch (error) {
      onError(error.response?.data?.message || error.message);
    } finally {
      setIsSavingContent(false);
    }
  };

  return (
    <form ref={formRef} className="glass-card space-y-5 px-8 py-10 lg:px-12" onSubmit={handleSubmit}>
      <div>
        <p className="section-kicker">Site content</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">About me and homepage carousel</h2>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Hero tagline
        <textarea
          className="textarea textarea-bordered min-h-24 rounded-3xl border-slate-200 bg-white"
          name="heroTagline"
          defaultValue={defaultValue.heroTagline}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        About me title
        <input
          className="input input-bordered rounded-2xl border-slate-200 bg-white"
          name="aboutMeTitle"
          defaultValue={defaultValue.aboutMeTitle}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        About me body
        <textarea
          className="textarea textarea-bordered min-h-36 rounded-3xl border-slate-200 bg-white"
          name="aboutMeBody"
          defaultValue={defaultValue.aboutMeBody}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
        Carousel image URLs (one per line)
        <textarea
          className="textarea textarea-bordered min-h-36 rounded-3xl border-slate-200 bg-white font-mono text-sm"
          name="carouselUrls"
          defaultValue={defaultValue.carouselUrls}
        />
      </label>
      <button className="btn btn-warning rounded-full px-6 text-base text-amber-950" disabled={isSavingContent}>
        {isSavingContent ? "Saving..." : "Save site content"}
      </button>
    </form>
  );
}

function normalizeCarouselImages(value) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((src, index) => ({
      src,
      alt: `Nouri By Morgan gallery image ${index + 1}`,
    }));
}

function getClassDraft(drafts, classes, classId) {
  const existingSession = classes.find((session) => session.id === classId);

  if (!existingSession) {
    return emptyClass;
  }

  return drafts[classId] || {
    title: existingSession.title,
    discipline: existingSession.discipline,
    schedule: existingSession.schedule,
    location: existingSession.location,
    description: existingSession.description,
    ctaLabel: existingSession.ctaLabel,
  };
}

function DashboardClassFields({ value, onChange, fieldPrefix = "new" }) {
  return (
    <div className="grid gap-4">
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-title`}>
        Title
        <input
          id={`${fieldPrefix}-title`}
          className="input input-bordered rounded-2xl border-slate-200 bg-white"
          name="title"
          value={value.title}
          onChange={onChange}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-discipline`}>
        Discipline
        <select
          id={`${fieldPrefix}-discipline`}
          className="select select-bordered rounded-2xl border-slate-200 bg-white"
          name="discipline"
          value={value.discipline}
          onChange={onChange}
        >
          <option>Yoga</option>
          <option>Body Sculpting</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-schedule`}>
        Schedule
        <input
          id={`${fieldPrefix}-schedule`}
          className="input input-bordered rounded-2xl border-slate-200 bg-white"
          name="schedule"
          value={value.schedule}
          onChange={onChange}
          placeholder="Tuesdays · 6:30 PM"
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-location`}>
        Location
        <input
          id={`${fieldPrefix}-location`}
          className="input input-bordered rounded-2xl border-slate-200 bg-white"
          name="location"
          value={value.location}
          onChange={onChange}
          placeholder="Downtown studio"
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-description`}>
        Description
        <textarea
          id={`${fieldPrefix}-description`}
          className="textarea textarea-bordered min-h-28 rounded-3xl border-slate-200 bg-white"
          name="description"
          value={value.description}
          onChange={onChange}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-700" htmlFor={`${fieldPrefix}-ctaLabel`}>
        CTA label
        <input
          id={`${fieldPrefix}-ctaLabel`}
          className="input input-bordered rounded-2xl border-slate-200 bg-white"
          name="ctaLabel"
          value={value.ctaLabel}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
