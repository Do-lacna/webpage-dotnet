import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Apple } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const APP_STORE_URL = 'https://apps.apple.com/sk/app/u%C5%A1etri/id6744099337';
const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.dutosvarc.usetri';

interface SearchLimitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchLimitDialog = ({ open, onOpenChange }: SearchLimitDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-brand-indigo">
            {t('categorySearch.searchLimitReached.title')}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('categorySearch.searchLimitReached.description')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white transition-colors hover:bg-black/80"
          >
            <Apple className="h-5 w-5" />
            {t('download.appStore')}
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white transition-colors hover:bg-black/80"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4 2.532 1.466c.564.327.564 1.127 0 1.454l-2.532 1.466-2.534-2.46 2.534-1.926zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
            </svg>
            {t('download.googlePlay')}
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchLimitDialog;
